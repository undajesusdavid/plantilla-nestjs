
export abstract class PaginatedResponseDto<T> {
  items: T[];
  totalPages: number;
  totalItems: number;

  constructor(items: T[], totalPages: number, totalItems: number) {
    this.items = items;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}