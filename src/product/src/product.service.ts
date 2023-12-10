import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { OrderDto } from './dtos/order.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  async create(name: string, quantity: number, price: number, imageUrl: string) {
    const product = this.repo.create({ name, quantity, price, imageUrl });
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) throw new Error('No PRODUCT');
    return this.repo.remove(product);
  }

  async update(productId: number, attrs: Partial<Product>) {
    const product = await this.findOne(productId);
    if (attrs?.quantity) {
      attrs.quantity = product.quantity - attrs.quantity;
    }
    if (!product) throw new Error('No Product with that ID');
    Object.assign(product, attrs);

    return this.repo.save(product);
  }

  handleOrderCreated(data: OrderDto[]) {
    data.forEach((product) => {
      this.update(product.productId, { quantity: product.quantity });
    });
  }
}
