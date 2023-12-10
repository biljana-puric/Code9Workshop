import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

interface IOrder {
    productId: number;
    quantity: number;
}
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('json')
    orderedProducts: IOrder[]
}