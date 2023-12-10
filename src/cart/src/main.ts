import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CartModule } from './cart.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CartModule, {
    transport: Transport.REDIS
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen();
}
bootstrap();
