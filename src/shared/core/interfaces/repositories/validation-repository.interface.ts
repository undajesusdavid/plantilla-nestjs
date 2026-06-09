export interface IValidationRepository<ID> {
    exists(id: ID): Promise<boolean>;
    existsAll(ids: ID[]): Promise<boolean>;
    checkIdsExistence(ids: ID[]): Promise<{ existingIds: ID[]; missingIds: ID[] }>;
}