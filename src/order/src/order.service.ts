import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
@Injectable()
export class OrderService {
  @Client({
    transport: Transport.REDIS
  })
  private client: ClientProxy;
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async create(body: CreateOrderDto) {
    const order = this.repo.create({ orderedProducts: body.orderedProducts });
    if (order) {
      this.client.emit('order-created', body);
    }
    return this.repo.save(order);
  }

  async findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) throw new Error('No Order with that ID');
    return this.repo.remove(order);
  }

  async removeAll() {
    const orders = await this.findAll();
    return this.repo.remove(orders);
  }
}
