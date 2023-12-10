import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}

    @MessagePattern('add_product_to_cart')
    addProduct(data: any) {
        return this.cartService.addProductToCart(parseInt(data.id), data.body)
    }

    @MessagePattern('all_products_cart')
    getCart() {
        return this.cartService.getCart()
    }

    @MessagePattern('remove_product_from_cart')
    removeProduct(data: any) {
        return this.cartService.removeProductFromCart(parseInt(data.id))
    }
}
