import {IsNumber} from "class-validator"
export class OrderProduct {
    @IsNumber()
    productId: number;
    @IsNumber()
    quantity: number;
}