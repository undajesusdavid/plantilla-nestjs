import { Transform } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { IsUUIDv7 } from '@src/shared/infrastructure/validations/IsUUIDv7';
import { User, UserRoles } from '@modules/users/core/entities/User';

export class GetUserRequestDto {
  @IsDefined({ message: 'El id es obligatorio' })
  @IsString({ message: 'El id debe ser de tipo string' })
  @IsUUIDv7({ message: 'El id debe ser un UUID válido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  id!: string;
}

export class GetUserDtoResponse {
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


