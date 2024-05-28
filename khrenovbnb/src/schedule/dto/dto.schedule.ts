import { RoomModel } from '../../room/room.model/room.model';
import {IsString} from "class-validator";

export class DtoSchedule {
  idRoom: RoomModel;
  @IsString({ message: 'Дата не может быть числом' })
  dateBooking: Date;
}
