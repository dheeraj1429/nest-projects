import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SingupDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter valid email' })
  readonly email: String;

  @IsNotEmpty()
  @IsString()
  readonly name: String;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Passowrd min length 5' })
  readonly password: String;
}
