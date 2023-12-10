import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDto } from './order.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  orderedProducts: OrderDto[];
}
