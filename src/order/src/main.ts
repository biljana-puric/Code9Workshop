import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OrderModule } from './order.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.REDIS
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen();
}

bootstrap();
