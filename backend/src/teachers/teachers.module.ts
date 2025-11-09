import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'defaultsecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [TeachersController],
  providers: [TeachersService, PrismaService],
  exports: [TeachersService],
})
export class TeachersModule {}
