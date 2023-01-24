import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CartModel } from './cart.model';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(CartModel) private readonly cartModel: ModelType<CartModel>) {}

    async create(dto: CreateCartDto): Promise<DocumentType<CartModel>>{
        return this.cartModel.create(dto);
    }

    async find(userId: string): Promise<DocumentType<CartModel>[]>{
        return this.cartModel.aggregate([
            {
                $lookup: {
                    from: "Users",
                    localField: "user",
                    foreignField: "_id",
                    as: "users"
                }
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "products",
                    foreignField: "_id",
                    as: "products"
                }
            }
        ]).exec();
    }
}