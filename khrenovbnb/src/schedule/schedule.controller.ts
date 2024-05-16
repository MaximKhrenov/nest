import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { DtoSchedule } from './dto/dto.schedule';
import { scheduleConstants } from './schedule.constants';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Get('all')
  async getSchedule() {
    return this.scheduleService.getSchedule();
  }
  @Get('item/:id')
  async getScheduleById(@Param('id') id: string) {
    const getScheduleById = await this.scheduleService.getScheduleById(id);
    if(!getScheduleById){
      throw new HttpException(
        scheduleConstants.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.scheduleService.getScheduleById(id);
  }
  @Post('create')
  async createSchedule(@Body() dto: DtoSchedule) {
    const createSchema = await this.scheduleService.createSchedule(dto);
    if (!createSchema) {
      throw new HttpException(
        scheduleConstants.NOT_SCHEDULE,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Delete(':id')
  async deleteSchedule(@Param() id: string) {
    return this.scheduleService.deleteScheduleById(id);
  }
}
