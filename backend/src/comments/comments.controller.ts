import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // 🟢 Criar comentário
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.commentsService.create(postId, user.sub, dto);
  }

  // 📜 Listar comentários de um post
  @Get()
  async findByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findByPost(postId);
  }

  // ✏️ Editar comentário (somente autor)
  @UseGuards(JwtAuthGuard)
  @Put(':commentId')
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() dto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const comment = await this.commentsService.findOne(commentId);

    if (comment.authorId !== user.sub)
      throw new ForbiddenException('Você não pode editar este comentário.');

    return this.commentsService.update(commentId, user.sub, dto);
  }

  // ❌ Deletar comentário (somente autor)
  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const comment = await this.commentsService.findOne(commentId);

    if (comment.authorId !== user.sub)
      throw new ForbiddenException('Você não pode deletar este comentário.');

    return this.commentsService.remove(commentId, user.sub);
  }

  // 📋 Listar comentários de um usuário específico em um post
  @Get('user/:userId')
  async findByUserInPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.commentsService.findByUserInPost(postId, userId);
  }

  // Busca todos os comentários de um usuário em qualquer post
  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.commentsService.findAllByUser(+userId);
  }

}
