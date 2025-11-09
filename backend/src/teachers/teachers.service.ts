import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  // 👩‍🏫 Criar professor com criação de User vinculada
  async create(data: CreateTeacherDto) {
    // 1️⃣ Verifica se o e-mail já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('E-mail já está em uso');
    }

    // 2️⃣ Cria o usuário com papel TEACHER e já vincula um registro de Teacher
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'TEACHER',
        teacher: {
          create: {
            subject: data.subject,
            hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
          },
        },
      },
      include: {
        teacher: true,
      },
    });

    return user;
  }

  // 🔍 Listar todos
  async findAll() {
    return this.prisma.teacher.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });
  }

  // 🔎 Buscar por ID
  async findById(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        students: true,
      },
    });

    if (!teacher) throw new NotFoundException('Professor não encontrado');
    return teacher;
  }

  // 👤 Buscar por ID de usuário
  async findByUserId(userId: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        students: true,
      },
    });

    if (!teacher) throw new NotFoundException('Professor não encontrado');
    return teacher;
  }

  // ✏️ Atualizar
  async update(id: number, data: UpdateTeacherDto) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Professor não encontrado');

    return this.prisma.teacher.update({
      where: { id },
      data: {
        subject: data.subject ?? undefined,
        hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
      },
      include: { user: true },
    });
  }

  // 🗑️ Remover
  async remove(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Professor não encontrado');

    // Remove o usuário também
    await this.prisma.user.delete({ where: { id: teacher.userId } });
    return { message: 'Professor removido com sucesso' };
  }
}
