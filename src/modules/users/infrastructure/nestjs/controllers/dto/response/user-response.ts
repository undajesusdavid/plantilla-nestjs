import { User, UserRoles } from "@src/modules/users/core/entities/User";

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  active: boolean;
  roles: UserRoles[];

  constructor(user: User) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.active = user.isActive();
    this.roles = user.getRoles();
  }
}






