import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { UserModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
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
            access_token: await this.jwtService.signAsync({ phone: dto.phone })
        }
    }

    async findUser(phone: string) {
        return this.userModel.findOne({ phone }).exec();
    }

    async validateUser(phone: string, password: string): Promise<Pick<UserModel, 'phone'>> {
        const user = await this.findUser(phone);
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
        }

        const isCorrectPassword = await compare(password, user.pwdHash);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
        }
        return { phone: user.phone };
    }

    async login(phone: string) {
        const payload = { phone };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
