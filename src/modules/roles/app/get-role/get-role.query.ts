import { Query } from '@shared/app/bus/query';

export class GetRoleQuery implements Query {
    constructor(public readonly id: string) { }
}