
import { IsString, IsArray, ArrayMinSize } from 'class-validator';


export class UpdateUserRolesRequestDto {
    @IsArray({ message: 'Los roles deben ser una lista' })
    @IsString({ each: true, message: 'Cada rol debe ser una cadena de texto' })
    @ArrayMinSize(1, { message: 'Debes asignar al menos un rol' })
    roles!: string[]
}

