import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SinupDto } from './dto/sinup.dto';
import { SerializeInterceptor } from '../interceptors/Transform.Interceptor';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Get('genrate-access-token')
   async genrateAccessToken(@Headers() headers) {
      return this.authService.genrateAccessToken(headers);
   }

   @Post('sign-up')
   async singUp(@Body() body: SinupDto) {
      return this.authService.signUpUser(body);
   }

   @SerializeInterceptor()
   @Post('sign-in')
   async signIn(@Body() body: SinupDto) {
      return this.authService.singIn(body?.email, body?.password);
   }
}
