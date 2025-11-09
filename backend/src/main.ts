import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();  
  
  console.log('🔐 JWT_SECRET carregado:', process.env.JWT_SECRET);

  await app.listen(3000);
  console.log(`🚀 Server is running on: http://localhost:3000`);
}
bootstrap();
