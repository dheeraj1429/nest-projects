import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [JwtModule],

   providers: [JwtTokenService],

   exports: [JwtTokenService],
})
export class JwtTokenModule {}
