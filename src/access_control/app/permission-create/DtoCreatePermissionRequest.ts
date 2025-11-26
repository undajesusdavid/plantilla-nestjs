import { ErrorDtoValidationRequest } from "src/shared/app/errors/ErrorDtoValidationRequest";

// Interfaz de props
export interface PermissionPropsRequest {
    name: string;
    description: string;
    module: string;
    resource: string;
    action: string,
    isActive: boolean;
}

// Clase DTO con validación
export class DtoCreatePermissionRequest {
    name: string;
    description: string;
    isActive: boolean;

    private constructor(props: PermissionPropsRequest) {
        this.name = props.name;
        this.description = props.description;
        this.isActive = props.isActive;

    }

    static create(props: PermissionPropsRequest) {
        const errors: string[] = [];

        if (typeof props.name !== 'string' || !props.name.trim()) {
            errors.push('El nombre debe ser una cadena no vacía');
        }

        if (typeof props.description !== 'string' || !props.description.trim()) {
            errors.push('La descripción debe ser una cadena no vacía');
        }

        if (typeof props.isActive !== 'boolean') {
            errors.push('isActive debe ser un valor booleano');
        }

        if (errors.length > 0) {
            throw new ErrorDtoValidationRequest(errors);
        }

        return new DtoCreatePermissionRequest(props);

    }

}
