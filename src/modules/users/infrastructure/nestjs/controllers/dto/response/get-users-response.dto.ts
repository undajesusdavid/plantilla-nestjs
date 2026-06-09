import { UserEntityFiltered } from "../mappers/UserEntityFiltered";

export class GetUsersResponseDto {
    data!: UserEntityFiltered[];
    total!: number;
    page!: number;
    limit!: number;


    constructor(partial: Partial<GetUsersResponseDto>) {
        Object.assign(this, partial);
    }
}




