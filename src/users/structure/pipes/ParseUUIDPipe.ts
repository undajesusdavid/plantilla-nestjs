import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate as isUUID } from "uuid";

@Injectable()
export class ParseUUIDPipe implements PipeTransform {
    transform(value: string): string {
        if (!isUUID(value)) {
            throw new BadRequestException(`El id "${value}" no es un UUID válido.`);
        }
        return value;
    }
}