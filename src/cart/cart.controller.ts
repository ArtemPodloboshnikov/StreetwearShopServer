import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { getIdFromToken } from '../utils/getIdFromToken';
import { JwtAuthGuard } from '../user/guards/jwt.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ProductService } from '../product/product.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService, private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':uuid')
    async getCart(@Param('uuid') uuid: string, @Req() request: Request) {
        if (uuid === 'self') {
            const id = getIdFromToken(request.headers.authorization);
            return this.cartService.find(id)
        } else {
            return this.cartService.find(uuid)
        }
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateCartDto) {
        dto.sizes.forEach(obj => {
            this.productService.updateCountSizes(obj.productId, obj.size, -obj.count);
        })
        return this.cartService.create(dto);
    }
}
