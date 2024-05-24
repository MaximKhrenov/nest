import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';
import { RoomModel, roomSchema } from './room.model/room.model';
import { RoomService } from './room.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoomModel.name, schema: roomSchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
