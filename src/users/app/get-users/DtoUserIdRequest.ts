import { validate as isUUID, version as uuidVersion } from 'uuid';

export class DtoUserIdRequest {
    constructor(public readonly id: string) { }

    validate(): void {
        if (!isUUID(this.id)) {
            throw new Error(`El ID no es un UUID válido: "${this.id}"`);
        }

        if (uuidVersion(this.id) !== 7) {
            throw new Error(`El UUID debe ser de versión 7, pero se recibió versión ${uuidVersion(this.id)}`);
        }
    }
}
