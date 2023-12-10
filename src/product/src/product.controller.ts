import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('')
export class ProductController {
  constructor(private productService: ProductService) {}

  @MessagePattern('products_all')
  getAllProducts() {
    return this.productService.findAll();
  }

  @MessagePattern('product_create')
  createProduct(body: CreateProductDto) {
    return this.productService.create(body.name, body.quantity, body.price, body.imageUrl);
  }

  @MessagePattern('product')
  findProduct(id: string) {
    return this.productService.findOne(parseInt(id));
  }

  @MessagePattern('product_delete')
  removeProduct(id: string) {
    return this.productService.remove(parseInt(id));
  }

  @MessagePattern('product_update')
  updateProduct(data: { id: string; body: { quantity: number } }) {
    return this.productService.update(parseInt(data.id), data.body);
  }

  @EventPattern('order-created')
  handleOrderCreated(data: CreateOrderDto) {
    this.productService.handleOrderCreated(data.orderedProducts);
  }
}
