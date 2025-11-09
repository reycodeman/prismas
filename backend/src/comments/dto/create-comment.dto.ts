import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'O conteúdo do comentário não pode estar vazio.' })
  @MaxLength(500, { message: 'O comentário deve ter no máximo 500 caracteres.' })
  content: string;
}
