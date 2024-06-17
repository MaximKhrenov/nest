import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './user.model/user.model';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { userConstants } from './user.constants';
import {genSalt, hash} from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(dto: UserDto): Promise<UserModel> {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      passwordHash: await hash(dto.passwordHash, salt),
      role: dto.role,
      phone: dto.phone,
    });
    const checkUserEmail = await this.findUserByEmail(dto.email);
    if (checkUserEmail) {
      throw new BadRequestException(userConstants.USER_IS_ALREADY_REGISTERED);
    }
    return newUser.save();
  }
  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
