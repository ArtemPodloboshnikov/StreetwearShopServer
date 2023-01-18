import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
    @prop({ unique: true })
    phone: string;

    @prop()
    pwdHash: string;

    @prop()
    address: string;

    @prop()
    flat: string;

    @prop()
    name: string
}
