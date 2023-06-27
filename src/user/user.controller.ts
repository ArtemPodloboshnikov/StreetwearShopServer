import { BadRequestException, Body, Controller, Get, HttpCode, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { ALREADY_EXISTS_ERROR } from './user.constants';
import { UserService } from './user.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserDto } from './dto/user.dto';
import { getIdFromToken } from '../utils/getIdFromToken';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        const user = await this.userService.findUser(dto.phone);

        if (user) {
            throw new BadRequestException(ALREADY_EXISTS_ERROR);
        }

        return await this.userService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() {phone, pwd}: AuthDto) {
        const user = await this.userService.validateUser(phone, pwd);
        return this.userService.login(user.id);
    }

    @UsePipes(new ValidationPipe())
    @Patch('update')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Body() data: UserDto, @Req() request: Request) {
        const id = getIdFromToken(request.headers.authorization)
        return this.userService.updateUser(id, data);
    }

    @Get(':uuid')
    @UseGuards(JwtAuthGuard)
    async getUser(@Param('uuid') uuid: string, @Req() request: Request) {
        if (uuid === 'self') {
            const id = getIdFromToken(request.headers.authorization)
            return this.userService.findById(id);
        } else {
            return this.userService.findById(uuid);
        }
    }
}
