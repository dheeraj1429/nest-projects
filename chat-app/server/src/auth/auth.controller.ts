import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('sign-in')
   async singIn(@Body() body: SignInDto, @Req() req, @Res() res) {
      return this.authService.signIn(body, req, res);
   }

   @Post('login')
   async login(@Body() body: SignInDto, @Req() req, @Res() res) {
      return this.authService.login(body, req, res);
   }
}
