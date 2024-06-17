import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }
  @Get(':userId')
  async findUserById(@Param('userId') userId: string) {
    return userId;
  }
}
