import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Patch,
  HttpException,
  HttpStatus, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { roomConstants } from './room.constants';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: RoomDto) {
    return this.roomService.create(dto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedRoom = await this.roomService.delete(id);
    if (!deletedRoom) {
      throw new HttpException(roomConstants.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
  @Get('item/:id')
  async get(@Param('id') id: string) {
    const getRoomById = await this.roomService.getRoomById(id);
    if (!getRoomById) {
      throw new HttpException(roomConstants.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.roomService.getRoomById(id);
  }
  @Get('all')
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: RoomDto) {
    return this.roomService.update(id, dto);
  }
}
