export interface PaginatedOptions<FilterType = Record<string, any>> {
  page: number;
  limit: number;
  search?: string;
  filters?: FilterType;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
}


export interface IReadRepository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  findAllByIds(ids: ID[]): Promise<T[]>;
  findPaginated(options: PaginatedOptions): Promise<PaginatedResult<T>>;
  count(): Promise<number>;
}