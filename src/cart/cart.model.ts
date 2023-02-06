import { prop, Ref } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { ProductModel, Sizes } from "../product/product.model";
import { UserModel } from "../user/user.model";

export class TimeOrder {
    @prop({type: String, required: true})
    time!: String;

    @prop({ref: () => ProductModel, required: true})
    productId!: Ref<ProductModel>;
}

export class PriceOrder {
    @prop({type: Number, min: 0, required: true})
    price!: number;

    @prop({ref: () => ProductModel, required: true})
    productId!: Ref<ProductModel>;
}

export class SizeOrder {
    @prop({enum: Sizes, type: String, required: true})
    size!: Sizes

    @prop({ref: () => ProductModel, required: true})
    productId!: Ref<ProductModel>;

    @prop({type: Number, required: true})
    count!: number;
}

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

    @prop({type: () => [TimeOrder], default: [], _id: false})
    periods: TimeOrder[];

    @prop({type: () => [TimeOrder], default: [], _id: false})
    dates: TimeOrder[];

    @prop({type: () => [PriceOrder], _id: false, required: true})
    prices: PriceOrder[];

    @prop({type: () => [SizeOrder], _id: false, required: true})
    sizes: SizeOrder[];
}
