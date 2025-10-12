
export interface UserProps {
    id: string;
    username: string;
    password: string;
    email: string;
    active: boolean;
}

export class User {
    private id: string;
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
        return this.id;
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
}
