import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SinupDto {
   @IsString()
   @IsNotEmpty()
   @IsEmail({}, { message: 'Please enter valid email' })
   email: string;

   @IsString()
   @IsNotEmpty()
   @MinLength(3)
   password: string;
}
