import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { AddProductDto } from '../dtos/add_product.dto';
import {CartService} from "./cart.service";

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/')
  getCart() {
    return this.cartService.findAll();
  }

  @Post('/add-product/:id')
  addProductToCart(@Param("id") id: string, @Body() body: any) {
    return this.cartService.addProductToCart(id, body)
  }

  @Delete('/:id')
  removeCart(@Param('id') id: string) {
    return this.cartService.removeCart(id);
  }

  @Delete('/remove-product/:id')
  removeProduct(@Param('id') productId: string) {
   return this.cartService.removeProduct(productId);
  }
}
