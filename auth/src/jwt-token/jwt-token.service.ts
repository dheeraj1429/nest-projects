import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mongooseId } from './jwt-token.interface';

@Injectable()
export class JwtTokenService {
   constructor(private readonly jwtService: JwtService) {}

   // genrate user access token.
   async genrateAccessToken(payload: { _id: mongooseId }): Promise<string> {
      const token = await this.jwtService.sign(payload, {
         expiresIn: '10s',
         secret: process.env.JWT_ACCESS_SECRET,
      });
      return token;
   }

   // genrate user refresh token
   async genrateRefreshToken(payload: { _id: mongooseId }): Promise<string> {
      const token = await this.jwtService.sign(payload, {
         expiresIn: '1y',
         secret: process.env.JWT_REFRESH_SECRET,
      });
      return token;
   }

   async genrateTokens(payload: {
      _id: mongooseId;
   }): Promise<{ accessToken: string; refreshToken: string }> {
      const accessToken = await this.genrateAccessToken(payload);
      const refreshToken = await this.genrateRefreshToken(payload);

      return {
         accessToken,
         refreshToken,
      };
   }

   async validateToken(token: string, secret: string) {
      const validate = await this.jwtService.verify(token, { secret });
      if (!validate) throw new UnauthorizedException('Please login first');
      // genrate new access token.
      const accessToken = await this.genrateAccessToken({ _id: validate?._id });
      return { accessToken };
   }
}
