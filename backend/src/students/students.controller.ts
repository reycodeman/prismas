import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // 🧾 Criar aluno
  @Post()
  async create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  // 📋 Listar todos
  @Get()
  async findAll() {
    return this.studentsService.findAll();
  }

  // 👤 Ver aluno logado
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const userId = req.user.sub;
    return this.studentsService.findByUserId(userId);
  }

  // 🔍 Buscar aluno por ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findById(id);
  }

  // ✏️ Atualizar aluno
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, dto);
  }

  // 🗑️ Excluir aluno
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}
