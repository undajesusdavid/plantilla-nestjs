export interface UuidService {
    generateV7(): string;
    isValidUUID(uuid: string): boolean;
}