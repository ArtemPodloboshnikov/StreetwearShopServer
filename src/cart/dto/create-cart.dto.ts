import { IsDate, IsOptional, IsString } from "class-validator";

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
    @IsString()
    period?: string;

    @IsOptional()
    @IsDate()
    date?: Date
}