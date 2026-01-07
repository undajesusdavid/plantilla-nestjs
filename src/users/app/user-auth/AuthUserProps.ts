export interface AuthUserPropsInput {
    username: string;
    password: string;
}

export interface AuthUserPropsOutput {
    token: string;
    id: string;
    username: string;
}