import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  providers: [CartService],
  imports: [],
  controllers: [CartController]
})
export class CartModule {}
