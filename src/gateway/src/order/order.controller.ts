import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateOrderDto } from '../dtos/create-order.dto';
import {OrderService} from "./order.service";

@Controller('order')
export class OrderController {
  @Client({
    transport: Transport.REDIS
  })
  private client: ClientProxy;
  constructor(private orderService: OrderService) {}

  @Post('/')
  createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.create(body);
  }

  @Get('/')
  getOrder() {
    return this.orderService.find();
  }

  @Delete('/:id')
  removeOrder(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Delete()
  removeOrders() {
    return this.orderService.removeAll();
  }
}
