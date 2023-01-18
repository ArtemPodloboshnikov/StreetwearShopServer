import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ProductModule } from './product/product.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    ProductModule,
    UserModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
