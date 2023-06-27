import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './user.constants';
import { UserModel } from './user.model';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService) {}

    async createUser(dto: AuthDto) {
        const salt = await genSalt(10);
        const newUser = new this.userModel({
            phone: dto.phone,
            pwdHash: await hash(dto.pwd, salt)
        })

        newUser.save();
        return {
            access_token: await this.jwtService.signAsync({ id: newUser._id }, {expiresIn: '7d'})
        }
    }

    async findUser(phone: string) {
        return this.userModel.findOne({ phone }).exec();
    }

    async findById(id: string) {
        return this.userModel.findOne({ _id: id.trim() }).select(['-pwdHash', '-_id']).exec();
    }

    async updateUser(id: string, dto: UserDto) {
        return this.userModel.updateOne({_id: id.trim() }, { $set: {...dto} })
    }

    async validateUser(phone: string, password: string): Promise<{id: Types.ObjectId}> {
        const user = await this.findUser(phone);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
        }

        const isCorrectPassword = await compare(password, user.pwdHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
        }
        return { id: user._id };
    }

    async login(id: Types.ObjectId) {
        const payload = { id };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
