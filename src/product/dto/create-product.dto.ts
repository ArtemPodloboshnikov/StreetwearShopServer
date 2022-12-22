import { Colors } from "../product.model";
import { IsString, IsInt, Min, IsEnum, IsArray } from "class-validator";
import { UNACCEPTABLE_PRICE_ERROR } from "../product.constants";

export enum SIZES {
    XXL,
    XL,
}

export class CreateProductDto {

    @IsString()
    title: string;

    @IsString()
    code: string;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsString()
    brand: string;

    @Min(0, { message: UNACCEPTABLE_PRICE_ERROR })
    @IsInt()
    price: number;

    @IsEnum(Colors)
    color: Colors;

    @IsEnum(SIZES)
    size: SIZES;
}