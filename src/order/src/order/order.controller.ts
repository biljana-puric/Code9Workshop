import { Controller } from '@nestjs/common';
import {OrderService} from "./order.service";
import {MessagePattern} from "@nestjs/microservices";

@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) {
    }

    @MessagePattern('create_order')
    createOrder(body: any) {
        return this.orderService.create(body);
    }

    @MessagePattern('order_all')
    getOrder() {
        return this.orderService.findAll();
    }
}
