export class PaginationMeta {
    totalItems!: number;
    itemCount!: number;
    itemsPerPage!: number;
    totalPages!: number;
    currentPage!: number;

    constructor(init?: Partial<PaginationMeta>) {
        Object.assign(this, init);
    }
}

export class PaginatedResponse<T> {
    constructor (
        public items: T[],
        public pagination: PaginationMeta
    ){}
}