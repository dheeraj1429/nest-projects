import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtTokenModule } from './jwt-token/jwt-token.module';

@Module({
   imports: [
      JwtModule,

      ConfigModule.forRoot({
         envFilePath: ['.env.development'],
      }),

      MongooseModule.forRoot(process.env.MONGODB_URL),

      AuthModule,

      JwtTokenModule,
   ],

   controllers: [],

   providers: [],
})
export class AppModule {}
