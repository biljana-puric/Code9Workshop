import { Injectable } from '@nestjs/common';
import {CreateOrderDto} from "../dtos/create-order.dto";
import {Client, ClientProxy, Transport} from "@nestjs/microservices";

@Injectable()
export class OrderService {
    @Client({
        transport: Transport.REDIS
    })
    private client: ClientProxy;

    create(body) {
        return this.client.send('order_create', body);
    }

    find(){
        return this.client.send('order_all', {});
    }

    remove(id) {
        return this.client.send('order_delete', id);
    }

    removeAll() {
        return this.client.send('order_delete_all', {});
    }
}
