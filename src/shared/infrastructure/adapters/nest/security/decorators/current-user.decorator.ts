import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TokenPayload = {
  id: string,
  username: string,
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as TokenPayload;
  },
);


