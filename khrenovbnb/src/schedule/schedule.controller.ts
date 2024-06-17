import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { DtoSchedule } from './dto/dto.schedule';
import { scheduleConstants } from './schedule.constants';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../user/user.model/role.enum";
import {RolesGuard} from "../auth/guards/roles.guard";

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getSchedule() {
    return this.scheduleService.getSchedule();
  }
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard)
  @Get('item/:id')
  async getScheduleById(@Param('id') id: string) {
    const getScheduleById = await this.scheduleService.getScheduleById(id);
    if (!getScheduleById) {
      throw new HttpException(
        scheduleConstants.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.scheduleService.getScheduleById(id);
  }
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createSchedule(@Body() dto: DtoSchedule) {
    return this.scheduleService.createSchedule(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSchedule(@Param() id: string) {
    return this.scheduleService.deleteScheduleById(id);
  }
}
