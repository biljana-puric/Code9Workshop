import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private repo: Repository<Product>){}

  getProducts() {
    return this.repo.find();
  }

  createProduct(body: any) {
    if (body.name && body.price && body.imageUrl && body.quantity) {
      const name = body.name;
      const quantity= body.quantity;
      const imageUrl =body.imageUrl;
      const price = body.price;
      const product = this.repo.create({name, quantity, price, imageUrl});
      return this.repo.save(product);
    } else {
      throw new Error('provide all fields')
    }
  }

  find(id: number) {
    return this.repo.findOneBy({id});
  }

  async delete(id: number) {
    const product = await this.find(id);
    return this.repo.remove(product);
  }

  async update(id: number, body: any) {
    const product = await this.find(id);
    product.quantity = product.quantity -  body.quantity;
    return this.repo.update(product.id, product);
  }

  async orderCreatedHandler(orderedProducts: any) {
    orderedProducts.forEach(product => {
      this.update(product.productId, product);
    })
  }
}
