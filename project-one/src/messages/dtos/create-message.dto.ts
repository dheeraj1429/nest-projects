import { IsString, IsNumber } from 'class-validator';

export class CreatePostMessageDto {
  @IsString()
  name: string;
  place: string;

  @IsNumber()
  age: number;
}
