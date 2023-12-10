import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('order_all')
  getOrder() {
    return this.orderService.findAll();
  }

  @MessagePattern('order_create')
  createOrder(body: CreateOrderDto) {
    return this.orderService.create(body);
  }

  @MessagePattern('order_delete')
  removeOrder(id: string) {
    return this.orderService.remove(parseInt(id));
  }

  @MessagePattern('order_delete_all')
  removeOrders() {
    return this.orderService.removeAll();
  }
}
