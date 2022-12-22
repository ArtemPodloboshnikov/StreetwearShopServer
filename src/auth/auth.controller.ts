import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ALREADY_EXISTS_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        const user = await this.authService.findUser(dto.phone);

        if (user) {
            throw new BadRequestException(ALREADY_EXISTS_ERROR);
        }

        return await this.authService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() {phone, pwd}: AuthDto) {
        const user = await this.authService.validateUser(phone, pwd);
        return this.authService.login(user.phone)
    }
}
