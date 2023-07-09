import { ExecutionContext, CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { jwtGuardResponse } from '.';

@Injectable()
export class JwtGuard implements CanActivate {
   constructor(private readonly jwtTokenService: JwtTokenService) {}
   canActivate(context: ExecutionContext): jwtGuardResponse {
      const request = context.switchToHttp().getRequest();
      const authorization = this.jwtTokenService.getToken(request);
      if (!authorization.token) throw new UnauthorizedException();
      const isValide = this.jwtTokenService.validateToken(authorization?.token, process.env.ACCESS_TOKEN);
      if (isValide) return true;
      return false;
   }
}
