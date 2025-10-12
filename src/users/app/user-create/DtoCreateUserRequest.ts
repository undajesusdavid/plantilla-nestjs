export class DtoCreateUserRequest {
    public readonly username: string;
    public readonly password: string;
    public readonly email: string;
    public readonly active: boolean;

    constructor(
        username: string,
        password: string,
        email: string,
        active?: boolean
    ) {
        this.username = username?.trim?.() ?? '';
        this.password = password?.trim?.() ?? '';
        this.email = email?.trim?.() ?? '';
        this.active = active ?? true;
    }

    validate(): string[] {
        const errors: string[] = [];

        // Validación de username
        if (typeof this.username !== 'string' || this.username.length < 3) {
            errors.push('El nombre de usuario debe tener al menos 3 caracteres');
        }

        // Validación de password
        if (typeof this.password !== 'string' || this.password.length < 6) {
            errors.push('La contraseña debe tener al menos 6 caracteres');
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof this.email !== 'string' || !emailRegex.test(this.email)) {
            errors.push('El correo electrónico no tiene un formato válido');
        }

        // Validación de active
        if (typeof this.active !== 'boolean') {
            errors.push('El campo "active" debe ser de tipo booleano');
        }

        return errors;
    }
}
