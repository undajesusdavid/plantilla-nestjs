export interface UuidService {
    generateUUID(): string;
    isValidUUID(uuid: string): boolean;
}