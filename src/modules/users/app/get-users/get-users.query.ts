import { Query } from '@src/shared/app/bus/query';

export class GetUsersQuery implements Query {
  constructor(
    public readonly search?: string,
    public readonly page?: number,
    public readonly limit?: number
  ) {}
}


