// src/comments/dto/update-comment.dto.ts
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  content?: string;
}
