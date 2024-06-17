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
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { RoomService } from './room.service';
import { roomConstants } from './room.constants';
import { UserEmailDecorator } from '../auth/decorators/user-email.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/user.model/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import {RolesGuard} from "../auth/guards/roles.guard";

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() dto: RoomDto) {
    return this.roomService.create(dto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedRoom = await this.roomService.delete(id);
    if (!deletedRoom) {
      throw new HttpException(roomConstants.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
  @Get('item/:id')
  async get(@Param('id') id: string, @UserEmailDecorator() email: string) {
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
  // @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: RoomDto) {
    return this.roomService.update(id, dto);
  }
}
