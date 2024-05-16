import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ScheduleModel,
  ScheduleModelDocument,
} from './schedule.model/schedule.model';
import { Model } from 'mongoose';
import { DtoSchedule } from './dto/dto.schedule';
import * as mongoose from 'mongoose';
import { RoomModel, RoomModelDocument } from '../room/room.model/room.model';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(ScheduleModel.name)
    private readonly scheduleModel: Model<ScheduleModelDocument>,
    @InjectModel(RoomModel.name)
    private readonly roomModel: Model<RoomModelDocument>,
  ) {}
  async createSchedule(dto: DtoSchedule): Promise<ScheduleModel> {
    const getAllScheduleByIDRoom = await this.scheduleModel
      .find({ idRoom: dto.idRoom })
      .exec();
    const [getRoomById] = await this.roomModel
      .find({
        _id: dto.idRoom,
      })
      .exec();
    const getDateScheduleForRoom = getAllScheduleByIDRoom.map((el) =>
      el.dateBooking.toDateString(),
    );
    if (
      !getDateScheduleForRoom.includes(
        new Date(dto.dateBooking).toDateString(),
      ) &&
      getRoomById.isActive
    ) {
      return this.scheduleModel.create(dto);
    }
  }
  async getSchedule(): Promise<ScheduleModel[]> {
    return this.scheduleModel.find().exec();
  }
  async getScheduleById(id: string): Promise<ScheduleModel> | null {
    return this.scheduleModel.findById(id).exec();
  }
  async deleteScheduleById(id: string): Promise<ScheduleModel> | null {
    return this.scheduleModel
      .findByIdAndDelete(new mongoose.Types.ObjectId(id))
      .exec();
  }
}
