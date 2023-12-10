import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { AddProductDto } from './dtos/add_product.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('cart_all')
  getCart() {
    return this.cartService.findAll();
  }

  @MessagePattern('cart_add_product')
  addProduct(data: any) {
    return this.cartService.addProductToCart(parseInt(data.id), data.body)
  }

  @MessagePattern('cart_delete')
  removeCart(id: string) {
    return this.cartService.remove(parseInt(id));
  }

  @MessagePattern('cart_delete_product')
  removeProduct(id: string) {
    return this.cartService.removeProduct(parseInt(id));
  }

  @EventPattern('order-created')
  handleOrderCreated() {
    this.cartService.handleOrderCreated();
  }
}
