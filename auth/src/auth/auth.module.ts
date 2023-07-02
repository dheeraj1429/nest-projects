import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema, Auth } from './schemas/auth.schema';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
   imports: [
      JwtTokenModule,

      MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
   ],

   controllers: [AuthController],

   providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
