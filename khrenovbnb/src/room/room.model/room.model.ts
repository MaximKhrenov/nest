import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type RoomModelDocument = HydratedDocument<RoomModel>;
@Schema()
export class RoomModel {
  @Prop()
  typeRoom: string;
  @Prop()
  advantagesRoom: string;
  @Prop()
  squareRoom: string;
  @Prop()
  isActive: boolean;
}
export const roomSchema = SchemaFactory.createForClass(RoomModel);
