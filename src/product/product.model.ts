import { prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from "mongoose";

export enum Colors {
    Grey,
    White,
    Black,
    Yellow,
    Blue,
    Green,
    Pink,
    Purple,
    Red
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
    @prop()
    title: string;

    @prop({ unique: true })
    code: string;

    @prop({ type: () => [String]})
    images: string[];

    @prop()
    brand: string;

    @prop()
    price: number;

    @prop({ enum: Colors})
    color: Colors;

    @prop()
    size: string;
}
