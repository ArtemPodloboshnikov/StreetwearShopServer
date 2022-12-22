import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { getJWTConfig } from 'src/configs/jwt.config';
import { AuthController } from './auth.controller';
import { UserModel } from './auth.model';
import { AuthService } from './auth.service';
import { JwtStratagy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy],
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
export class AuthModule {}
