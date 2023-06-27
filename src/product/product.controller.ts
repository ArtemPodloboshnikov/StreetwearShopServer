import {
   Body,
   Controller,
   Post,
   Get,
   Param,
   Delete,
   Patch,
   HttpCode,
   ValidationPipe,
   UsePipes,
   BadRequestException,
   UseGuards,
   NotFoundException
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND_ERROR, PRODUCT_EXIST } from './product.constants';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

   constructor(private readonly productService: ProductService) {}

   @UsePipes(new ValidationPipe())
   @Post('create')
   async create(@Body() dto: CreateProductDto) {
      return this.productService.create(dto);
      // const product = await this.productService.find(dto.model);
      // if (!product.length) {
      //    return this.productService.create(dto);
      // } else {
      //    throw new BadRequestException(PRODUCT_EXIST);
      // }
   }

   @Get(':id')
   async getById(@Param('id') id: string) {
      const product = await this.productService.findById(id);

      if (!product.length) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }

      return product[0];
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   async delete(@Param('id') id: string) {
      const product = await this.productService.delete(id);

      if (!product) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }
   }

   @UseGuards(JwtAuthGuard)
   @Patch(':id')
   async patch(@Param('id') id: string, @Body() dto: ProductModel) {
      const product = await this.productService.update(id, dto);

      if (!product) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }

      return product;
   }

   @Get('find/:modelLatin')
   async find(@Param('modelLatin') modelLatin: string) {
      return this.productService.find(modelLatin);
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Post('search')
   async findByParam(@Body() dto: FindProductDto) {
      return this.productService.findByParam(dto);
   }
}
