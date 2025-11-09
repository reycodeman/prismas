import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // 🟢 Registrar novo usuário
  async register(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    return {
      message: 'Usuário registrado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  // 👥 Listar todos os usuários (restrito a MANAGER)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // 🔍 Buscar por e-mail (para AuthService)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // 🔎 Buscar por ID (para rota /users/profile)
  async findById(id: number) {
    if (!id) throw new BadRequestException('ID inválido');

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) throw new BadRequestException('Usuário não encontrado');
    return user;
  }

  // 🚪 Logout — remove o refresh token do banco
  async logout(userId: number) {
    console.log('🧩 [Logout] ID recebido:', userId);

    if (!userId) {
      throw new BadRequestException('ID do usuário inválido');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return { message: 'Logout realizado com sucesso' };
  }

}
