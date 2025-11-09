import { IsOptional, IsString } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  hireDate?: string; // ISO date string
}
