export interface PaginatedOptions<FilterType = Record<string, any>> {
  page?: number;
  limit?: number;
  search?: string;
  searchFields: string[];
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  filters?: FilterType;

}

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
  }
}


export interface IReadRepository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  findAllByIds(ids: ID[]): Promise<T[]>;
  findPaginated(options: PaginatedOptions): Promise<PaginatedResult<T>>;
  count(): Promise<number>;
}