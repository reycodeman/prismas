import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  registrationNumber: string;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsInt()
  teacherId?: number;
}

