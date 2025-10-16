import { UserID } from "./UserID";

export interface UserProps {
    id: UserID;
    username: string;
    password: string;
    email: string;
    active: boolean;
}

export class User {
    private id: UserID;
    private username: string;
    private password: string;
    private email: string;
    private active: boolean;

    constructor(props: UserProps) {
        this.id = props.id;
        this.username = props.username;
        this.password = props.password;
        this.email = props.email;
        this.active = props.active;
    }

    // Getters
    getId(): string {
        return this.id.toString();
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getEmail(): string {
        return this.email;
    }

    isActive(): boolean {
        return this.active;
    }

    // Setters
    setUsername(username: string): void {
        if (!username || username.trim() === "") {
            throw new Error("El nombre de usuario no puede estar vacío.");
        }
        this.username = username;
    }

    setPassword(password: string): void {
        if (password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }
        this.password = password;
    }

    setEmail(email: string): void {
        if (!email.includes("@")) {
            throw new Error("El correo electrónico no es válido.");
        }
        this.email = email;
    }

    setActive(active: boolean): void {
        this.active = active;
    }

    setId(id: UserID): void {
        this.id = id;
    }
}
