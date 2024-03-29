import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModule } from '../product/product.module';
import { CartController } from './cart.controller';
import { CartModel } from './cart.model';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CartModel,
        schemaOptions: {
          collection: 'Cart'
        }
      }
    ]),
    ProductModule
  ]
})
export class CartModule {}
