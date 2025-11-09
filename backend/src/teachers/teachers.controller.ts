import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles_decorator';
import { Request } from 'express';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  // 👩‍💼 Criar professor — somente MANAGER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  // 🔎 Listar todos — MANAGER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get()
  async findAll() {
    return this.teachersService.findAll();
  }

  // 👤 Perfil do professor logado — qualquer professor autenticado
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const user = req.user as any;
    return this.teachersService.findByUserId(user.id);
  }

  // 🔎 Buscar por id — MANAGER ou o próprio professor
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as any;
    const teacher = await this.teachersService.findById(id);

    // se for MANAGER, libera; se for TEACHER, permite apenas se user.id === teacher.userId
    if (user.role === 'MANAGER') return teacher;
    if (user.role === 'TEACHER' && user.id === teacher.userId) return teacher;

    // caso contrário, forbidden
    throw new ForbiddenException('Acesso negado');

  }

  // ✏️ Atualizar — MANAGER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) dto: UpdateTeacherDto) {
    return this.teachersService.update(id, dto);
  }

  // 🗑 Remover — MANAGER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.remove(id);
  }
}
