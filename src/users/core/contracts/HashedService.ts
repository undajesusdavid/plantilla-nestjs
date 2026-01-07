export interface HashedService {

    hashed(rawPassword: string): string;
    compare(rawPassword: string, hashedPassword: string): boolean;
}