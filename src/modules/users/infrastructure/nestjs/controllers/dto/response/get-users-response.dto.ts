import { PaginationType } from "@src/shared/core/types/pagination.type";
import { UserEntityFiltered } from "../mappers/UserEntityFiltered";
import { PaginatedResponse } from "@src/shared/app/use-cases/response/paginated.response";
import { User } from "@src/modules/users/core/entities/User";

export class GetUsersResponseDto {
    items: UserEntityFiltered[];
    pagination: PaginationType

    constructor(response: PaginatedResponse<User>) {
        const {items, pagination} = response;
        this.items = items.map(user => new UserEntityFiltered(user));
        this.pagination = pagination;
    }
}




