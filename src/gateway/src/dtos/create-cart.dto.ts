import {IsNumber} from "class-validator";

export class CreateCartDto {
    @IsNumber()
    quantity: number;
}