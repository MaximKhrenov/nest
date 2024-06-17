import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Role } from '../../user/user.model/role.enum';
import { UserService } from '../../user/user.service';
import { authConstants } from '../auth.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    const userData = await this.userService.findUserByEmail(user);
    if (userData?.role !== Role.ADMIN) {
      throw new HttpException(
        authConstants.ACCESS_IS_DENIED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}