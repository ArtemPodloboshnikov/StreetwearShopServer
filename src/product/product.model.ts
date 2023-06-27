import { prop, PropType, Ref } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { UserModel } from "../user/user.model";

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
    MALE = 'Мужчина',
    FEMALE = 'Женщина'
}

export class Comments {
    @prop({ref: () => UserModel, required: true})
    userId?: Ref<UserModel>;

    @prop({type: () => UserModel})
    user?: UserModel

    @prop({type: String, required: true})
    text: string;

    @prop({type: Number, default: 0})
    like: number;

    @prop({type: String, default: []})
    files: string[];
}

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
    @prop({ type: ()=> [String] }, PropType.MAP)
    codes: Record<Sizes, string[]>;

    @prop({ type: () => [String]})
    images: string[];

    @prop()
    brand: string;

    @prop()
    model: string;

    @prop()
    modelLatin: string;

    @prop()
    material: string;

    @prop()
    country: string;

    @prop()
    description: string;

    @prop()
    category: string;

    @prop()
    subcategory: string;

    @prop()
    gender: Gender;

    @prop()
    price: number;

    @prop({ enum: Colors, type: String})
    color: Colors;

    @prop({ type: ()=> Number }, PropType.MAP)
    sizes: Record<Sizes, number>;

    @prop({type: () => [Comments], default: []})
    comments: Comments[];
}
