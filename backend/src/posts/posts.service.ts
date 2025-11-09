import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        content: data.content,
        imageUrl: data.imageUrl,
        author: {
          connect: { id: userId }, // <-- Aqui conectamos o autor existente
        },
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });
  }


  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true, role: true } },
        comments: true,
        likes: true,
      },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        comments: true,
        likes: true,
      },
    });
    if (!post) throw new NotFoundException('Post não encontrado');
    return post;
  }

  async update(id: number, data: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post não encontrado');
    return this.prisma.post.update({
      where: { id },
      data,
      include: { author: true, comments: true, likes: true },
    });
  }

  async remove(id: number) {
    await this.prisma.post.delete({ where: { id } });
    return { message: 'Post removido com sucesso' };
  }
}
