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
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND_ERROR, UNIQUE_KEY_CODE_ERROR } from './product.constants';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

   constructor(private readonly productService: ProductService) {}

   @UsePipes(new ValidationPipe())
   @Post('create')
   async create(@Body() dto: CreateProductDto) {
      this.productService.create(dto);
   }

   @Get(':id')
   async getById(@Param('id') id: string) {
      const product = this.productService.getById(id);

      if (!product) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }
   }

   @UseGuards(JwtAuthGuard)
   @Delete(':id')
   async delete(@Param('id') id: string) {
      const product = this.productService.delete(id);

      if (!product) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }
   }

   @UseGuards(JwtAuthGuard)
   @Patch(':id')
   async patch(@Param('id') id: string, @Body() dto: ProductModel) {
      if (dto.code) {
         throw new BadRequestException(UNIQUE_KEY_CODE_ERROR);
      }

      const product = this.productService.update(id, dto);

      if (!product) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }

      return product;
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Post('find')
   async find(@Body() dto: FindProductDto) {
      return this.productService.getByParam(dto);
   }
}
