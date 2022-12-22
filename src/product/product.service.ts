import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

    async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
        return this.productModel.create(dto);
    }

    async update(id: string, dto: ProductModel) {
        return this.productModel.updateOne({_id: id.trim()}, {$set: {...dto}})
    }

    async delete(id: string): Promise<DocumentType<ProductModel> | null> {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async getById(id: string): Promise<DocumentType<ProductModel>[]> {
        return this.productModel.find({ _id: id.trim() }).exec();
    }

    async getByParam(dto: FindProductDto): Promise<DocumentType<ProductModel[]>> {

        const find_dto = JSON.parse(JSON.stringify(dto));
        delete find_dto.limit
        return this.productModel.aggregate([
            {
                $match: {
                    ...find_dto
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            }
        ]).exec() as Promise<DocumentType<ProductModel[]>>;
    }
}