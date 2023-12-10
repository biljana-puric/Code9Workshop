import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface IOrder {
  id: number;
  quantity: number;
  productId: number;
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json') // Use 'json' type for orderedProducts
  orderedProducts: IOrder[];
}
