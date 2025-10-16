import { ErrorDtoValidationRequest } from "src/shared/app/errors/ErrorDtoValidationRequest";
import { AllowedActionOptions } from "src/permissions/core/RegisteredPermissionOptions";
import { ModuleAndResources } from "src/permissions/core/RegisteredPermissionOptions";

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
    module: string;
    resource: string;
    action: string;
    isActive: boolean;

    private constructor(props: PermissionPropsRequest) {
        this.name = props.name;
        this.description = props.description;
        this.module = props.module;
        this.resource = props.resource;
        this.action = props.action;
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

        if (typeof props.module !== 'string' || !props.module.trim()) {
            errors.push('El módulo debe ser una cadena no vacía');
        }

        if (typeof props.resource !== 'string' || !props.resource.trim()) {
            errors.push('El recurso debe ser una cadena no vacía');
        }

        const resources = ModuleAndResources[props.module];
        if(!resources){
            errors.push('El modulo proporcionado no existe en los registros');
        } else if(!resources.includes(props.resource)){
            errors.push('El modulo no contiene el recurso ingresado');
        }

        if (!AllowedActionOptions.includes(props.action)) {
            errors.push(`La acción debe ser una de: ${AllowedActionOptions.join(', ')}`);
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
