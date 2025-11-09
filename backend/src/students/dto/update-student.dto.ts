import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsOptional, IsInt } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsOptional()
  @IsInt()
  teacherId?: number;
}
