import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { getJWTConfig } from 'src/configs/jwt.config';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { JwtStratagy } from './strategies/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStratagy],
  imports: [
    // MongooseModule.forFeature([{
    //   name: UserModel.name,
    //   schema: UserSchema
    // }]),
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'Users'
        }
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    }),
    PassportModule
  ]
})
export class UserModule {}
