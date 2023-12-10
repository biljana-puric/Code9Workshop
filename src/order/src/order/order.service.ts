import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./order.entity";
import {ClientProxy, Transport, Client} from "@nestjs/microservices";
@Injectable()
export class OrderService {

    @Client({
        transport: Transport.REDIS
    })
    private client: ClientProxy;
    constructor(@InjectRepository(Order) private repo: Repository<Order>){}

    async create(body: any) {
        const orderedProducts = body.orderedProducts;
        const order: Order = this.repo.create({orderedProducts})
        const savedOrder = await this.repo.save(order);
        if (savedOrder) {
            this.client.emit('order-created-success', body);
        }
        return savedOrder;
    }

    async findAll() {
        return this.repo.find();
    }
}
