import { Controller } from '@nestjs/common';
import {EventPattern, MessagePattern} from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('show_products')
  getProducts() {
    return this.productService.getProducts();
  }

  @MessagePattern('create_product')
  createProduct(body: any) {
    return this.productService.createProduct(body);
  }

  @MessagePattern('product')
  getProduct(id: string) {
    return this.productService.find(parseInt(id))
  }

  @MessagePattern('delete_product')
  deleteProduct(id: string) {
      return this.productService.delete(parseInt(id));
  }

  @MessagePattern('update_product')
  updateProduct(data: any) {
      return this.productService.update(parseInt(data.id), data.body);
  }

  @EventPattern('order-created-success')
  orderCreatedHandler(data: any) {
    return this.productService.orderCreatedHandler(data.orderedProducts);
  }
}
