import { UserRepository } from "../contracts/UserRepository";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { ErrorUseCase } from "../../../shared/app/errors/ErrorUseCase";
import { DtoGetUsersResponse } from "./DtoGetUsersResponse";
import { DtoUserIdRequest } from "./DtoUserIdRequest";
import { GetUsers } from "./GetUsers";

export class GetUsersImp implements GetUsers {

    constructor(private userRepo: UserRepository) { }

    async getAll(): Promise<DtoGetUsersResponse[]> {

        try {
            const users = await this.userRepo.getAll();
            const response = users.map(user => new DtoGetUsersResponse(user));
            return response;
        } catch (error) {
            if (error instanceof ErrorRepositoryService) {
                throw new ErrorUseCase(
                    `Error GetUser-getAll: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "getAll" }
                );
            }
            throw new Error(error.message);
        }



    }

    async getOne(dtoId: DtoUserIdRequest): Promise<DtoGetUsersResponse> {
        try {
            const user = await this.userRepo.getOneById(dtoId.id);
            return new DtoGetUsersResponse(user);
        } catch (error) {
            if (error instanceof ErrorRepositoryService) {
                throw new ErrorUseCase(
                    `Error GetUser-getOne: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "getOne" }
                );
            }
            throw new Error(error.message);
        }
    }

    /*getSome(ids: string[]): Promise<DtoGetUsersResponse[]> {
        
    }*/
}