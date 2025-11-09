import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  // Criar novo aluno
  async create(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: 'STUDENT',
        student: {
          create: {
            registrationNumber: dto.registrationNumber,
            course: dto.course ?? '',
            ...(dto.teacherId
              ? { teacher: { connect: { id: dto.teacherId } } } // ✅ só conecta se existir teacherId
              : {}), // ✅ senão, ignora o relacionamento
          },
        },
      },
      include: { student: true },
    });

    return user;
  }

  // Listar todos os alunos
  async findAll() {
    return this.prisma.student.findMany({
      include: { user: true, teacher: { include: { user: true } } },
    });
  }

  // Buscar por ID
  async findById(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: { user: true, teacher: { include: { user: true } } },
    });

    if (!student) throw new NotFoundException('Aluno não encontrado');
    return student;
  }

  // Buscar pelo ID do usuário logado
  async findByUserId(userId: number) {
    const student = await this.prisma.student.findUnique({
      where: { userId },
      include: { user: true, teacher: { include: { user: true } } },
    });

    if (!student) throw new NotFoundException('Aluno não encontrado');
    return student;
  }

  // Atualizar aluno
  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Aluno não encontrado');

    return this.prisma.student.update({
      where: { id },
      data: {
        course: dto.course ?? student.course,
        teacher: dto.teacherId
          ? { connect: { id: dto.teacherId } }
          : undefined,
      },
      include: { user: true, teacher: { include: { user: true } } },
    });
  }

  // Deletar aluno
  async remove(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Aluno não encontrado');

    await this.prisma.user.delete({ where: { id: student.userId } });
    return { message: 'Aluno removido com sucesso' };
  }
}
