import { Colors, Gender, Sizes } from "../product.model";
import { IsString, IsInt, Min, IsEnum, IsArray, IsObject } from "class-validator";
import { UNACCEPTABLE_PRICE_ERROR } from "../product.constants";

export class CreateProductDto {
    @IsObject()
    codes: Record<Sizes, string[]>;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsString()
    material: string;

    @IsString()
    country: string;

    @IsString()
    description: string;

    @IsString()
    category: string;

    @IsString()
    subcategory: string;

    @IsEnum(Gender)
    gender: Gender;

    @Min(0, { message: UNACCEPTABLE_PRICE_ERROR })
    @IsInt()
    price: number;

    @IsEnum(Colors)
    color: Colors;

    @IsObject()
    sizes: Record<Sizes, number>;
}