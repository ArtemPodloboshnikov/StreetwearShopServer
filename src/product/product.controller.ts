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
import { PRODUCT_NOT_FOUND_ERROR, UNIQUE_KEY_CODE_ERROR, PRODUCT_EXIST } from './product.constants';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

   constructor(private readonly productService: ProductService) {}

   @UsePipes(new ValidationPipe())
   @Post('create')
   async create(@Body() dto: CreateProductDto) {
      const product = await this.productService.find(dto.code);
      if (!product.length) {
         return this.productService.create(dto);
      } else {
         throw new BadRequestException(PRODUCT_EXIST);
      }
   }

   @Get(':id')
   async getById(@Param('id') id: string) {
      const idArray = id.split('-');
      const product = await this.productService.findById(idArray[idArray.length - 1]);

      if (!product.length) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }

      return product;
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
      if (dto.code) {
         throw new BadRequestException(UNIQUE_KEY_CODE_ERROR);
      }

      const product = await this.productService.update(id, dto);

      if (!product) {
         throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
      }

      return product;
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Post('find')
   async find(@Body() dto: FindProductDto) {
      return this.productService.findByParam(dto);
   }
}
