import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from '../product/product.model';
import { UserModel } from '../user/user.model';
import { CartModel } from './cart.model';
import { CreateCartDto } from './dto/create-cart.dto';

type CartReturn = {
    user: UserModel,
    waiting: ProductModel[],
    progress: ProductModel[],
    delivered: ProductModel[],
} & Pick<CartModel, 'periods'|'dates'|'prices'|'createdAt'|'_id'|'updatedAt'>

@Injectable()
export class CartService {
    constructor(@InjectModel(CartModel) private readonly cartModel: ModelType<CartModel>) {}

    async create(dto: CreateCartDto): Promise<DocumentType<CartModel>>{
        return this.cartModel.create(dto);
    }

    async find(userId: string): Promise<DocumentType<CartReturn>>{


        const cart: CartReturn[] = await this.cartModel.aggregate([
            {
                $lookup: {
                    from: "Users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "waitingIds",
                    foreignField: "_id",
                    as: "waiting"
                }
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "progressIds",
                    foreignField: "_id",
                    as: "progress"
                }
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "deliveredIds",
                    foreignField: "_id",
                    as: "delivered"
                }
            },
            {
                $unset: [
                    'userId',
                    'waitingIds',
                    'progressIds',
                    'deliveredIds',
                    'waiting.codes',
                    'waiting.material',
                    'waiting.country',
                    'waiting.description',
                    'waiting.gender',
                    'waiting.color',
                    'waiting.sizes',
                    'waiting.comments',
                    'progress.codes',
                    'progress.material',
                    'progress.country',
                    'progress.description',
                    'progress.gender',
                    'progress.color',
                    'progress.sizes',
                    'progress.comments',
                    'delivered.codes',
                    'delivered.material',
                    'delivered.country',
                    'delivered.description',
                    'delivered.gender',
                    'delivered.color',
                    'delivered.sizes',
                    'delivered.comments',
                ]
            }
        ]).exec();

        return cart.find(c => c.user._id.toString() === userId) as DocumentType<CartReturn>
    }
}