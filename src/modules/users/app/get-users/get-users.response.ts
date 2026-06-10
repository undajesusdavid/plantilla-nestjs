import { User } from "../../core/entities/User";
import { PaginationType } from "@src/shared/core/types/pagination.type";

export interface getUsersResponse {
    users: User[],
    pagination: PaginationType
}