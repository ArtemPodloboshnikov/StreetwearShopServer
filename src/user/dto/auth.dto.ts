import { IsPhoneNumber, MinLength } from "class-validator";
import { PASSWORD_LENGTH_ERROR, PHONE_FORMAT_ERROR } from "../user.constants";

export class AuthDto {
    @IsPhoneNumber('RU', { message: PHONE_FORMAT_ERROR })
    phone: string;

    @MinLength(8, { message: PASSWORD_LENGTH_ERROR })
    pwd: string;
}