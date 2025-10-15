export class Uuid {
    private readonly value: string;

    protected constructor(id: string) {
        this.value = id;
    }

    public static create(id: string): Uuid {
        if (!this.isValid(id)) {
            throw new Error(`Invalid UUIDv7: ${id}`);
        }
        return new Uuid(id);
    }

    public static isValid(id: string): boolean {
        const uuidV7Regex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidV7Regex.test(id);
    }

    public toString(): string {
        return this.value;
    }
}
