import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    // MongooseModule.forFeature([{
    //   name: ProductModel.name,
    //   schema: ProductSchema
    // }])
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'Products'
        }
      }
    ])
  ]
})
export class ProductModule {}
