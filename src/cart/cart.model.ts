import { Type } from "@nestjs/common";
import { prop, PropType, Ref } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { ProductModel } from "../product/product.model";
import { UserModel } from "../user/user.model";

export interface CartModel extends Base {}

export class CartModel extends TimeStamps{
    @prop({ref: () => UserModel})
    userId: Ref<UserModel>;

    @prop({ref: () => ProductModel, default: []})
    waitingIds: Ref<ProductModel>[];

    @prop({ref: () => ProductModel, default: []})
    progressIds: Ref<ProductModel>[];

    @prop({ref: () => ProductModel, default: []})
    deliveredIds: Ref<ProductModel>[];

    @prop({default: null})
    period: string;

    @prop({default: null})
    date: Date
}
