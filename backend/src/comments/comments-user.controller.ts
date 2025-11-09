import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsUserController {
  constructor(private readonly commentsService: CommentsService) {}

  // 🔍 Buscar todos os comentários de um usuário
  @Get('user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.commentsService.findAllByUser(userId);

  }

  @Get()
  async findAll(@Query() query: any) {
    return this.commentsService.findAll(query);
  }

}
