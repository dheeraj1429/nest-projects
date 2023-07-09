import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectInterface } from 'src/shared/interface/common.interface';
import { tokenSecret } from '.';

@Injectable()
export class JwtTokenService {
   constructor(private readonly jwtService: JwtService) {}

   async genrateUserToken(payload: ObjectInterface, expiresIn: string, secret: tokenSecret): Promise<string> {
      const token = await this.jwtService.sign(payload, { expiresIn, secret });
      return token;
   }

   validateToken(token: string, secret: tokenSecret = undefined) {
      const valide = this.jwtService.verify(token, { secret: !!secret ? secret : process.env.ACCESS_TOKEN });
      if (!valide) throw new ForbiddenException('Token expire');
      return true;
   }

   getToken(req: Request): { token: string | null } {
      const authorization = req.headers['authorization'] as string;
      if (!authorization) return { token: null };
      const token = authorization.split(' ')?.[1];
      if (!token) return { token: null };
      return { token };
   }
}
