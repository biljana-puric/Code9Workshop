import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateProductDto } from '../dtos/create-product.dto';
import {ProductService} from "./products.service";

@Controller('product')
export class ProductController {
  @Client({
    transport: Transport.REDIS
  })
  private client: ClientProxy;
  constructor(private prodService: ProductService) {}

  @Get('/')
  getProducts() {
   return this.prodService.findAll();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.prodService.findOne(id);
  }

  @Post('/')
  createProduct(@Body() body: CreateProductDto) {
   return this.prodService.create(body);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.prodService.delete(id);
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.client.send('product_update', { id, body });
  }
}
