import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Auth {
   @Prop({ required: true, unique: true })
   email: string;

   @Prop({ required: true })
   password: string;

   @Prop({ type: Date, default: Date.now })
   createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
