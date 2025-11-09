import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // necessário para usar JwtAuthGuard
import { CommentsUserController } from './comments-user.controller';

@Module({
  imports: [AuthModule],
  controllers: [CommentsController, CommentsUserController],
  providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
