import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { slugify } from 'transliteration';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { UserModel } from '../user/user.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

    async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
        return this.productModel.create({...dto, modelLatin: slugify(dto.model, {lowercase: true})});
    }

    async update(id: string, dto: ProductModel) {
        return this.productModel.updateOne({_id: id.trim()}, {$set: {...dto}})
    }

    async delete(id: string): Promise<DocumentType<ProductModel> | null> {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async updateCountSizes(id: string, size: string, count: number) {
        await this.productModel.updateOne({ _id: id}, {$inc: {[`sizes.${size}`]: count}});
    }

    async find(modelLatin: string): Promise<DocumentType<ProductModel>[]> {
        // return this.productModel.find({ modelLatin: modelLatin.trim() }).exec();
        type ProductReturn = ProductModel & {users: UserModel[]};
        const products: ProductReturn[] =  await this.productModel.aggregate([
            {
                $lookup: {
                    from: "Users",
                    localField: "comments.userId",
                    foreignField: "_id",
                    as: "users"
                }
            },
            { $unset: ['users.pwdHash', 'users.createdAt', 'users.updatedAt', 'users.__v', 'users.address', 'users.flat', 'users.phone'] },
            {
                $match: {
                    modelLatin: modelLatin.trim()
                }
            }
        ]).exec();

        const deleteObjectProperty = (key: string, { [key]: deletedKey, ...others }) => others;

        return products.map(product => {
            const comments = product.comments.map(comment => {
                const user = product.users.find(user => user._id.toString() === comment.userId?.toString())!;
                return {
                    text: comment.text,
                    like: comment.like,
                    files: comment.files,
                    user
                }
            })

            return {
                ...deleteObjectProperty('users', product),
                comments
            }
        }) as DocumentType<ProductModel>[]


        // return {...deleteObjectProperty('users', products)} as DocumentType<ProductModel>[]
    }

    async findById(id: string): Promise<DocumentType<ProductModel>[]> {
        return this.productModel.find({ _id: id.trim() }).exec();
    }

    async findByParam(dto: FindProductDto): Promise<DocumentType<ProductModel[]>> {

        const find_dto = JSON.parse(JSON.stringify(dto));
        delete find_dto.limit
        return this.productModel.aggregate([
            {
                $match: find_dto
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            },
            {
                $unset: ['createdAt', 'updatedAt', '__v']
            }
        ]).exec() as Promise<DocumentType<ProductModel[]>>;
    }
}
