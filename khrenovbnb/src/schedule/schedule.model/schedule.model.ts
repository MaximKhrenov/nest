import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { RoomModel } from '../../room/room.model/room.model';
export type ScheduleModelDocument = HydratedDocument<ScheduleModel>;
@Schema()
export class ScheduleModel {
  @Prop({ type: MSchema.Types.ObjectId, ref: RoomModel.name })
  idRoom: RoomModel;
  @Prop({ required: true })
  dateBooking: Date;
}
export const scheduleSchema = SchemaFactory.createForClass(ScheduleModel);
