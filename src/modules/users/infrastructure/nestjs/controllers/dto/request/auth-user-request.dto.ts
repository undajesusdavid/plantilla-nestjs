import { Transform } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

export class AuthUserRequestDto {
  //--------------------------------------------------------------------------
  @IsDefined({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser de tipo string' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username!: string;
  //--------------------------------------------------------------------------
  @IsDefined({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser de tipo string' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  password!: string;
  //--------------------------------------------------------------------------
}

