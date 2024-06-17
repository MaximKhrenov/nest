import { createParamDecorator } from '@nestjs/common';
export const UserEmailDecorator = createParamDecorator(
    (data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
