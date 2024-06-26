import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModel, scheduleSchema } from './schedule.model/schedule.model';
// import { RoomModel, roomSchema } from '../room/room.model/room.model';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    RoomModule,
    MongooseModule.forFeature([
      { name: ScheduleModel.name, schema: scheduleSchema },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
