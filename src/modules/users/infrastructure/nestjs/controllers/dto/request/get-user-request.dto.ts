import { Transform } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { IsUUIDv7 } from '@src/shared/infrastructure/validations/IsUUIDv7';

export class GetUserRequestDto {
  @IsDefined({ message: 'El id es obligatorio' })
  @IsString({ message: 'El id debe ser de tipo string' })
  @IsUUIDv7({ message: 'El id debe ser un UUID válido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  id!: string;
}

