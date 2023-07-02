import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { mongooseId } from './auth.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

         // access token secret.
         secretOrKey: process.env.JWT_ACCESS_SECRET,
      });
   }

   async validate(payload: any): Promise<{ _id: mongooseId }> {
      const { _id } = payload;
      return { _id };
   }
}
