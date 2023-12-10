import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, CartModule, OrderModule],
  controllers: [],
  providers: []
})
export class AppModule {}
