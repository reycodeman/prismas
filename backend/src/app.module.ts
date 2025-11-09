import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    // 🌍 Variáveis de ambiente disponíveis globalmente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // ✅ adiciona esta linha
    }),

    // 🔐 JWT global
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultsecret',
      signOptions: { expiresIn: '15m' },
    }),

    // 📦 Módulos principais
    AuthModule,
    UsersModule,
    TeachersModule,
    StudentsModule,
    TeachersModule,
    PostsModule,
    CommentsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}


