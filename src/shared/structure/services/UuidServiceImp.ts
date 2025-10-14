import { Injectable } from "@nestjs/common";
import { UuidService } from "src/shared/app/contracts/UuidService";
import { ErrorUuidService } from "src/shared/app/errors/ErrorUuidService";
import { uuidv7 } from "uuidv7";

@Injectable()
export class UuidServiceImp implements UuidService {
    generateV7(): string {
        try {
            return uuidv7();
        } catch (error) {
            throw new ErrorUuidService(
                'Error al intentar generar el UUID',
                'UUID_GENERATE_FAILED',
                { originalError: error, class: this.constructor.name, method: "generate" }
            );
        }
    }
}
