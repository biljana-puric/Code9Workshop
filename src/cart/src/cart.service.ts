import { Injectable } from '@nestjs/common';
import { Cart } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProductDto } from './dtos/add_product.dto';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  findByProductId(productId: number) {
    return this.repo.find({ where: { productId } });
  }

  async update(productId: number, attrs: Partial<Cart>) {
    const product = await this.findByProductId(productId);
    if (!product) throw new Error('No Product in the cart');
    Object.assign(product[0], attrs);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const cart = await this.findOne(id);
    if (!cart) throw new Error('No CART with that ID');
    return this.repo.remove(cart);
  }

  async removeProduct(id: number) {
    const product = await this.findByProductId(id);
    if (!product) throw new Error('No Product in the cart');
    return this.repo.remove(product);
  }

  async addProductToCart(productId: number, body) {
    const quantity = body.quantity;
    const cartEntry = this.repo.create({productId, quantity})

    const products = await this.findByProductId(productId);
    // if product is already in cart just add to the quantity
    if (products.length === 0) {
      const cart = this.repo.create({ productId, quantity });
      return this.repo.save(cart);
    } else {
      products[0].quantity += quantity;
      return this.repo.save(products[0]);
    }

  }

  async handleOrderCreated() {
    const cart = await this.findAll();
    if (!cart) throw new Error('No cart');
    return this.repo.remove(cart);
  }
}
