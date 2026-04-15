import { Query } from 'src/shared/app/bus/query';

export class GetMyPermissionsQuery implements Query {
  constructor(public readonly userId: string) {}
}
