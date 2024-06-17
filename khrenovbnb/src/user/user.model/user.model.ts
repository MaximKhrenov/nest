import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.enum';

export type UserDocument = HydratedDocument<UserModel>;
@Schema()
export class UserModel {
  @Prop()
  name: string;
  @Prop({ unique: true })
  email: string;
  @Prop({ unique: true })
  passwordHash: string;
  @Prop({ unique: true })
  phone: string;
  @Prop({ required: true })
  role: string;
}
export const UserModelSchema = SchemaFactory.createForClass(UserModel);
