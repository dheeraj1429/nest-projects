import {
   ConflictException,
   HttpException,
   HttpStatus,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SinupDto } from './dto/sinup.dto';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtTokenService: JwtTokenService,
      @InjectModel(Auth.name) private readonly auth: mongoose.Model<Auth>,
   ) {}

   async doesUserExists(singUpUserInfo: { email: String }): Promise<boolean> {
      const { email } = singUpUserInfo;

      const isExists = await this.auth.findOne({ email }, { email: 1 });

      if (isExists) return true;
      else false;
   }

   async singIn(email: string, password: string) {
      const isExists = await this.auth.findOne({ email });

      if (!isExists) {
         throw new UnauthorizedException('Account is not exists');
      }

      const checkPassword = await bcrypt.compare(password, isExists?.password);

      if (!checkPassword)
         throw new UnauthorizedException('Password is not valid plase check');

      const tokens = await this.jwtTokenService.genrateTokens({
         _id: isExists?._id,
      });

      return {
         _id: isExists?._id,
         email: isExists?.email,
         createdAt: isExists?.createdAt,
         accessToken: tokens?.accessToken,
         refreshToken: tokens?.refreshToken,
      };
   }

   async signUpUser(singUpUserInfo: SinupDto) {
      const { email, password } = singUpUserInfo;

      const isExists = await this.doesUserExists({ email });

      if (isExists) {
         throw new ConflictException('Email already exists');
      }

      const hashPassword = await bcrypt.hash(
         password,
         Number(process.env.SALTORROUND),
      );

      const createNewUser = await new this.auth({
         email: email,
         password: hashPassword,
      }).save();

      if (createNewUser) {
         const tokens = await this.jwtTokenService.genrateTokens({
            _id: createNewUser?._id,
         });

         return {
            _id: createNewUser?._id,
            email: createNewUser?.email,
            createdAt: createNewUser?.createdAt,
            accessToken: tokens?.accessToken,
            refreshToken: tokens?.refreshToken,
         };
      }

      throw new HttpException(
         'Internal server error',
         HttpStatus.INTERNAL_SERVER_ERROR,
      );
   }

   async genrateAccessToken(headers: any) {
      const refreshToken = headers?.['refresh-token'];
      if (!refreshToken)
         throw new UnauthorizedException('Refresh token is required!');
      return this.jwtTokenService.validateToken(
         refreshToken,
         process.env.JWT_REFRESH_SECRET,
      );
   }
}
