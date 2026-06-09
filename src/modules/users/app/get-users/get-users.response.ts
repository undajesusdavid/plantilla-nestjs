import { User } from "../../core/entities/User";

export interface getUsersResponse {
    users: User[],
    total: number
}