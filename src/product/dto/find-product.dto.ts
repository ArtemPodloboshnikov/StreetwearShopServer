import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Colors, Gender, Sizes } from "../product.model";

export class FindProductDto {
    @IsOptional()
    @IsString()
    code?: string;

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
    @IsEnum(Sizes)
    size?: Sizes;

    @IsNumber()
    limit: number
}