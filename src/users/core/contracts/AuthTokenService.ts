export interface AuthTokenService {
    auth(payload: any): Promise<string>
    verify(token: string): Promise<any>
}