import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/singup')
  singUp(@Body() singupDto: SingupDto): Promise<string> {
    return this.authService.singUp(singupDto);
  }
}
