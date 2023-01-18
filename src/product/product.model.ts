import { prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from "mongoose";

export enum Colors {
    RED = 'красный',
    BLUE = 'синий',
    WHITE = 'белый',
    GREEN = 'зелёный',
    BLACK = 'чёрный',
    YELLOW = 'жёлтый',
    ORANGE = 'оранжевый',
    VIOLET = 'фиолетовый',
    BROWN = 'коричневый',
    GRAY = 'серый',
    PINK = 'розовый',
    TURQUOISE = 'бирюзовый'
}

export enum Sizes {
    XXL = 'XXL',
    XL = 'XL',
    L = 'L',
    M = 'M',
    S = 'S',
    XS = 'XS'
}

export enum Gender {
    MALE = 'мужчина',
    FEMALE = 'женщина'
}

// export type ProductDocument = ProductModel & Document

// @Schema({ collection: 'Products'})
// export class ProductModel {
//     @Prop({ type: () => String})
//     _id: ObjectId

//     @Prop()
//     title: string;

//     @Prop()
//     code: string;

//     @Prop([String])
//     images: string[];

//     @Prop()
//     brand: string;

//     @Prop()
//     price: number;

//     @Prop({ enum: Colors })
//     color: Colors;

//     @Prop()
//     size: string;
// }

// export const ProductSchema = SchemaFactory.createForClass(ProductModel);

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
    @prop({ unique: true })
    code: string;

    @prop({ type: () => [String]})
    images: string[];

    @prop()
    brand: string;

    @prop()
    model: string;

    @prop()
    material: string;

    @prop()
    country: string;

    @prop()
    category: string;

    @prop()
    subcategory: string;

    @prop()
    gender: Gender;

    @prop()
    price: number;

    @prop({ enum: Colors, type: String})
    colors: Colors[];

    @prop({ enum: Sizes, type: String })
    sizes: Sizes[];
}
