import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductModule, {
    transport: Transport.REDIS
  });
  await app.listen();
}
bootstrap();
