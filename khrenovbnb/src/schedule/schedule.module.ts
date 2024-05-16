import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModel, scheduleSchema } from './schedule.model/schedule.model';
import { RoomModel, roomSchema } from '../room/room.model/room.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScheduleModel.name, schema: scheduleSchema },
      { name: RoomModel.name, schema: roomSchema },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
