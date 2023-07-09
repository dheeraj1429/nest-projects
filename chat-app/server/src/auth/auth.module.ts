import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';

@Module({
   imports: [JwtTokenModule, MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],

   controllers: [AuthController],

   providers: [AuthService],

   exports: [],
})
export class AuthModule {}
