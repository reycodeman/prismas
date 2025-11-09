import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(postId: number, userId: number, dto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post não encontrado');

    return this.prisma.comment.create({
      data: { content: dto.content, authorId: userId, postId },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async findByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(commentId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) throw new NotFoundException('Comentário não encontrado');
    return comment;
  }

  async update(commentId: number, userId: number, dto: CreateCommentDto) {
    await this.findOne(commentId);
    return this.prisma.comment.update({
      where: { id: commentId },
      data: { content: dto.content },
    });
  }

  async remove(commentId: number, userId: number) {
    await this.findOne(commentId);
    return this.prisma.comment.delete({ where: { id: commentId } });
  }

  async findByUserInPost(postId: number, userId: number) {
    return this.prisma.comment.findMany({
      where: { postId, authorId: userId },
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllByUser(userId: number) {
    const commentsList = await this.prisma.comment.findMany({
      where: { authorId: userId },
      include: {
        post: { select: { id: true, content: true } },
        author: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Reduz o conteúdo do post para no máximo 60 caracteres
    return commentsList.map(comment => ({
      ...comment,
      post: {
        ...comment.post,
        content:
          comment.post?.content.length > 60
            ? comment.post.content.slice(0, 60) + '...'
            : comment.post.content,
      },
    }));  
  }

  async findAll(query: any) {
    const {
      page = 1,
      limit = 10,
      postId,
      authorId,
      startDate,
      endDate,
      search,
    } = query;

    const skip = (page - 1) * limit;

    const filters: any = {};

    if (postId) filters.postId = Number(postId);
    if (authorId) filters.authorId = Number(authorId);

    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    if (search) {
      filters.content = { contains: search, mode: 'insensitive' };
    }

    const [comments, total] = await Promise.all([
      this.prisma.comment.findMany({
        where: filters,
        include: {
          post: { select: { id: true, content: true } },
          author: { select: { id: true, name: true, email: true } },
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.comment.count({ where: filters }),
    ]);

    // Limitar o conteúdo do post a 60 caracteres
    const trimmed = comments.map(comment => ({
      ...comment,
      post: {
        ...comment.post,
        content:
          comment.post?.content.length > 60
            ? comment.post.content.slice(0, 60) + '...'
            : comment.post.content,
      },
    }));

    return {
      data: trimmed,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }



}
