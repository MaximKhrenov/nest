import {Body, Controller, Post, UsePipes, HttpCode, ValidationPipe} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { email, password }: AuthDto) {
    const user = await this.authService.validateUser(email, password);
    const result = await this.authService.login(user.email);

    return {
      access_token: result.access_token,
      user: { id: result.user._id, role: result.user.role },
    };
    // return this.authService.login(user.email);

  }
}
