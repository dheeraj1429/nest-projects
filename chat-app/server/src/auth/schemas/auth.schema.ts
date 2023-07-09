import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
   @Prop()
   email: string;

   @Prop()
   password: string;

   @Prop({ type: Date, default: Date.now })
   createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth).index({ email: 1 });
