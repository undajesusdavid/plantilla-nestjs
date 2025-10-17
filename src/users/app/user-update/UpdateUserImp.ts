import { UserID } from "src/users/core/UserID";
import { UserRepository } from "../contracts/UserRepository";
import { DtoUpdateUserRequest } from "./DtoUpdateUserRequest";
import { DtoUpdateUserReponse } from "./DtoUpdateUserResponse";
import { UpdateUser } from "./UpdateUser";
import { ErrorUseCase } from "../../../shared/app/errors/ErrorUseCase";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";

export class UpdateUserImp implements UpdateUser {

    constructor(
        private userRepo: UserRepository
    ) { }

    async update(dtoRequest: DtoUpdateUserRequest): Promise<DtoUpdateUserReponse> {
        try {
            if (!UserID.isValid(dtoRequest.id)) {
                throw new Error("El ID del usuario ha actualizar es invalido");
            }
            const user = await this.userRepo.getOneById(dtoRequest.id);

            dtoRequest.username && user.setUsername(dtoRequest.username);
            dtoRequest.email && user.setEmail(dtoRequest.email);
            dtoRequest.active !== undefined && user.setActive(dtoRequest.active);
            this.userRepo.update(user.getId(), user);
            return new DtoUpdateUserReponse(user);
        } catch (error) {
            if (
                error instanceof ErrorRepositoryService
            ) {
                throw new ErrorUseCase(
                    `Error UpdateUser: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "update" }
                );
            }
            throw new Error(error.message);
        }
    }
}