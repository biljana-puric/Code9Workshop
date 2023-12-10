import { Injectable } from '@nestjs/common';
import {Client, ClientProxy, Transport} from "@nestjs/microservices";

@Injectable()
export class CartService {
    @Client({
        transport: Transport.REDIS
    })
    private client: ClientProxy;

    findAll() {
        return this.client.send('cart_all', {});
    }

    addProductToCart(id, body) {
        return this.client.send('cart_add_product', {id, body});
    }

    removeCart(id) {
        return this.client.send('cart_delete', id);
    }

    removeProduct(id) {
        return this.client.send('cart_delete_product', id);
    }

}
