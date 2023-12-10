import { IsNumber, ValidateNested } from 'class-validator';
import { OrderDto } from './order.dto';

export class CreateOrderDto {
  @IsNumber()
  id: number;

  @ValidateNested()
  orderedProducts: OrderDto[];
}
