export interface IWriteRepository<T, ID> {
    save(entity: T): Promise<void>;
    saveMany(entities: T[]): Promise<void>;
    update(id: ID, entity: Partial<T>): Promise<void>;
    delete(id: ID): Promise<void>;
    deleteMany(ids: ID[]): Promise<void>;
}