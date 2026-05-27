import { AuthUserResponse } from "@src/modules/users/app/auth-user/auth-user.response";

export class AuthResponseDto {
  token: string;
  id: string;
  username: string;

  constructor(auth: AuthUserResponse) {
    this.token = auth.token;
    this.id = auth.id;
    this.username = auth.username;
  }
}

