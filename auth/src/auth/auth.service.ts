import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SingupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async singUp(signInDto: SingupDto): Promise<string> {
    const { email, name, password } = signInDto;

    const token = await this.jwtService.sign(
      { email, name, password },
      { secret: process.env.JWT_SECRET },
    );

    return token;
  }
}
