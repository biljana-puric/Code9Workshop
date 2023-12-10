import { IsNumber } from 'class-validator';

export class OrderDto {
  @IsNumber()
  id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  productId: number;
}
