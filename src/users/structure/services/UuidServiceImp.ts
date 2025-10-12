import { Injectable } from "@nestjs/common";
import { UuidService } from "src/users/app/contracts/UuidService";
import { ErrorUuidService } from "src/users/app/errors/ErrorUuidService";
import { uuidv7 as uuid } from "uuidv7";

@Injectable()
export class UuidServiceImp implements UuidService {
    generate(): string {
        try {
            return uuid();
        } catch (error) {
            throw new ErrorUuidService(
                'Error al intentar generar el UUID',
                'UUID_GENERATE_FAILED',
                { originalError: error, class: this.constructor.name, method: "generate" }
            );
        }
    }
}
