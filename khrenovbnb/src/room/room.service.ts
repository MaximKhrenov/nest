import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomModel, RoomModelDocument } from './room.model/room.model';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(RoomModel.name)
    private readonly roomModel: Model<RoomModelDocument>,
  ) {}
  async create(dto: RoomDto): Promise<RoomModel> {
    return this.roomModel.create(dto);
  }
  async delete(id: string) {
    // return this.roomModel.findByIdAndDelete(id).exec();
    return this.roomModel.updateOne({ _id: id }, { isActive: false }).exec();
  }
  async getRoomById(id: string): Promise<RoomModel> | null {
    return this.roomModel.findById(id).exec();
  }
  async getAllRooms(): Promise<RoomModel[]> {
    return this.roomModel.find().exec();
  }
  async update(id: string, dto: RoomDto) {
    return this.roomModel
      .updateOne(
        { _id: id },
        {
          typeRoom: dto.typeRoom,
          advantagesRoom: dto.advantagesRoom,
          squareRoom: dto.squareRoom,
          isActive: dto.isActive,
        },
      )
      .exec();
  }
}
