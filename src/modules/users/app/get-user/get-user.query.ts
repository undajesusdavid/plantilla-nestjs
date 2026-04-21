import { Query } from '@shared/app/bus/query';

export class GetUserQuery implements Query {
  constructor(public readonly id: string) {}
}


