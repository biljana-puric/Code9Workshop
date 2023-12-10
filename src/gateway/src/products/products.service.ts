import { Injectable } from '@nestjs/common';
import {Client, ClientProxy, Transport} from "@nestjs/microservices";

@Injectable()
export class ProductService {
    @Client({
        transport: Transport.REDIS
    })
    private client: ClientProxy;

    findAll() {
        return this.client.send('products_all', {});
    }

    findOne(id) {
        return this.client.send('product', id);
    }

    create(body) {
        return this.client.send('product_create', body);
    }

    delete(id) {
        return this.client.send('product_delete', id);
    }

}
