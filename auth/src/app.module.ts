import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtTokenModule } from './jwt-token/jwt-token.module';
import { ProductModule } from './product/product.module';
import { PassportModule } from '@nestjs/passport';

@Module({
   imports: [
      PassportModule,

      // config module
      ConfigModule.forRoot({
         envFilePath: ['.env.development'],
         isGlobal: true,
      }),

      // app module
      AuthModule,

      // database connection
      MongooseModule.forRoot(process.env.MONGODB_URI),

      JwtTokenModule,

      // product module
      ProductModule,
   ],

   controllers: [],

   providers: [],
})
export class AppModule {}
