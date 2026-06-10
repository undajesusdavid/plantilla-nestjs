
export abstract class DataTableQuery {
    public readonly search?: string;
    public readonly page?: number;
    public readonly limit?: number;
    public readonly orderBy?: string;
    public readonly orderDirection?: 'asc' | 'desc';

    constructor(init?: Partial<DataTableQuery>) {
        Object.assign(this, init);
    }
}