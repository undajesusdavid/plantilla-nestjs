import { ErrorDtoValidationRequest } from "src/shared/app/errors/ErrorDtoValidationRequest";

export interface PropsUpdateUserRequest {
    id: string;
    username?: string;
    email?: string;
    active?: boolean;
}

export class DtoUpdateUserRequest {
    public readonly id: string;
    public readonly username?: string;
    public readonly email?: string;
    public readonly active?: boolean;

    private constructor(props: PropsUpdateUserRequest) {
        this.id = props.id;
        this.username = props.username;
        this.email = props.email;
        this.active = props.active;
    }

    static create(props: PropsUpdateUserRequest) {
        const errors: string[] = [];

        if (typeof props.id !== 'string') {
            errors.push('El ID del usuario a editar es requerido');
        }

        // Validación de username (solo si se proporciona)
        if (props.username !== undefined) {
            if (typeof props.username !== 'string' || props.username.trim().length < 3) {
                errors.push('El nombre de usuario debe ser una cadena con al menos 3 caracteres');
            }
        }

        // Validación de email (solo si se proporciona)
        if (props.email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (typeof props.email !== 'string' || !emailRegex.test(props.email)) {
                errors.push('El correo electrónico no tiene un formato válido');
            }
        }

        // Validación de active (solo si se proporciona)
        if (props.active !== undefined) {
            if (typeof props.active !== 'boolean') {
                errors.push('El campo "active" debe ser de tipo booleano');
            }
        }

        if(Object.keys(props).length <= 1){
            errors.push('Debe actualizar al menos una propiedad del usuario');
        }

        if (errors.length > 0) {
            throw new ErrorDtoValidationRequest(errors);
        }

        return new DtoUpdateUserRequest(props);
    }
}
