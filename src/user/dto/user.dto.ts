import { IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    pwd?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    flat?: string;

    @IsOptional()
    @IsString()
    avatar?: string;
}