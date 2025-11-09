import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsOptional()
  hireDate?: string; // formato ISO (ex: "2025-10-22")
}
