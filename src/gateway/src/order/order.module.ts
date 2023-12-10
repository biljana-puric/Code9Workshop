import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {OrderService} from "./order.service";

@Module({
  providers: [OrderService],
  imports: [],
  controllers: [OrderController]
})
export class OrderModule {}
