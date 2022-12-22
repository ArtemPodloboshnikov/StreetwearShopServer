import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SIZES } from "./create-product.dto";

export class FindProductDto {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsEnum(SIZES)
    size?: SIZES;

    @IsNumber()
    limit: number
}