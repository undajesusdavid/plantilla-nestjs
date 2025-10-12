export class DtoCredentialsRequest {
    public readonly username: string;
    public readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    validate(): void {
        // Validación de username
        if (!this.username || typeof this.username !== 'string') {
            throw new Error('El nombre de usuario es obligatorio y debe ser una cadena de texto.');
        }

        if (this.username.trim().length < 3 || this.username.trim().length > 30) {
            throw new Error('El nombre de usuario debe tener entre 3 y 30 caracteres.');
        }

        // Validación de password
        if (!this.password || typeof this.password !== 'string') {
            throw new Error('La contraseña es obligatoria y debe ser una cadena de texto.');
        }

        if (this.password.length < 6 || this.password.length > 64) {
            throw new Error('La contraseña debe tener entre 6 y 64 caracteres.');
        }
    }
}
