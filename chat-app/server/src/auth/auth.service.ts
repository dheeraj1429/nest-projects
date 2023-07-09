import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { SignInDto } from './dtos/auth.dto';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { responseObject, userAlreadyExists } from 'src/utils/helper';
import { AuthResponse } from '.';

@Injectable()
export class AuthService {
   constructor(private readonly jwtTokenService: JwtTokenService, @InjectModel(Auth.name) private readonly authModel: Model<Auth>) {}

   async signIn(data: SignInDto, req: Request, res: Response): AuthResponse {
      const { email, password } = data;

      // find the user is exists or not.
      const isUserExists = await userAlreadyExists('email', email, this.authModel, {});

      if (isUserExists.exists) {
         const err = responseObject(false, true, 'User already exists');
         return res.status(HttpStatus.NOT_FOUND).json(err);
      }

      // genrate hash
      const hashPassword = await bcrypt.hash(password, 10);

      // create new document.
      const user = await new this.authModel({
         email,
         password: hashPassword,
      }).save();

      if (user) {
         // genrate user tokens
         const accessToken = await this.jwtTokenService.genrateUserToken({ _id: user?._id.toString() }, '5m', process.env.ACCESS_TOKEN);
         const refreshToken = await this.jwtTokenService.genrateUserToken({ _id: user?._id.toString() }, '1y', process.env.REFRESH_TOKEN);
         const response = responseObject(true, false);
         const responseWithTokens = Object.assign(response, { email: user?.email, accessToken, refreshToken });
         return res.status(HttpStatus.CREATED).json(responseWithTokens);
      }
   }

   async login(body: SignInDto, req: Request, res: Response): AuthResponse {
      const { email, password } = body;

      // find the user is exists or not.
      const isUserExists = await userAlreadyExists('email', email, this.authModel, {});

      if (!isUserExists.exists) {
         const err = responseObject(false, true, 'Account not found!');
         return res.status(HttpStatus.NOT_FOUND).json(err);
      }

      // validate the password
      const isValidPassword = await bcrypt.compare(password, isUserExists?.doc?.password);

      if (isValidPassword) {
         const accessToken = await this.jwtTokenService.genrateUserToken({ _id: isUserExists.doc?._id.toString() }, '5m', process.env.ACCESS_TOKEN);
         const refreshToken = await this.jwtTokenService.genrateUserToken({ _id: isUserExists.doc?._id.toString() }, '1y', process.env.REFRESH_TOKEN);
         const response = responseObject(true, false);
         const responseWithTokens = Object.assign(response, { email: isUserExists.doc?.email, accessToken, refreshToken });
         return res.status(HttpStatus.CREATED).json(responseWithTokens);
      } else {
         const err = responseObject(false, true, 'Account password is not match!');
         res.status(HttpStatus.BAD_REQUEST).json(err);
      }
   }
}
