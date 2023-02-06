import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { Sizes } from "../../product/product.model";

export class SizeParam {
    @IsNotEmpty()
    @IsEnum(Sizes)
    size!: Sizes;

    @IsNotEmpty()
    @IsString()
    productId!: string;

    @IsNotEmpty()
    @IsNumber()
    count!: number;
}

export class PriceParam {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price!: number;

    @IsNotEmpty()
    @IsString()
    productId!: string;
}

export class TimeParam {
    @IsNotEmpty()
    @IsString()
    time!: string;

    @IsNotEmpty()
    @IsString()
    productId!: string;
}

export class CreateCartDto {
    @IsString()
    userId: string;

    @IsOptional()
    @IsString({each: true})
    waitingIds?: string[];

    @IsOptional()
    @IsString({each: true})
    progressIds?: string[];

    @IsOptional()
    @IsString({each: true})
    deliveredIds?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => TimeParam)
    periods?: TimeParam[]

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => TimeParam)
    dates?: TimeParam[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PriceParam)
    prices!: PriceParam[]

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => SizeParam)
    sizes!: SizeParam[]
}