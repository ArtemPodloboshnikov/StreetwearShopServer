import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Colors, Gender, Sizes } from "../product.model";

export class FindProductDto {
    @IsOptional()
    @IsObject()
    codes?: Record<Sizes, string[]>;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsString()
    material?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    subcategory?: string;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsEnum(Colors)
    color?: Colors;

    @IsOptional()
    @IsObject()
    size?: Record<Sizes, number>;

    @IsNotEmpty()
    @IsNumber()
    limit!: number
}