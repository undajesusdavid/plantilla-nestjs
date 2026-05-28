import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ToBoolean } from '@src/shared/infrastructure/transformers/ToBoolean';

export class UpdateUserRequestDto {

  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser de tipo string' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  username?: string;
  //--------------------------------------------------------------------------------
  @IsOptional()
  @IsString({ message: 'El email debe ser de tipo string' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  email?: string;
  //--------------------------------------------------------------------------------
  @IsOptional()
  @ToBoolean()
  @IsBoolean({ message: 'El campo activo debe ser de tipo booleano' })
  active?: boolean;
  //--------------------------------------------------------------------------------
}
