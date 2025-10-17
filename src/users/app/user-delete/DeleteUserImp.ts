import { UserRepository } from "../contracts/UserRepository";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { ErrorUseCase } from "src/shared/app/errors/ErrorUseCase";
import { DeleteUser } from "./DeleteUser";
import { DtoDeleteUserRequest } from "./DtoDeleteUserRequest";
import { DtoDeleteUserResponse } from "./DtoDeleteUserResponse";
import { UserID } from "src/users/core/UserID";

export class DeleteUserImp implements DeleteUser {

    constructor(
        private userRepo: UserRepository
    ) { }

    async delete(dtoRequest: DtoDeleteUserRequest): Promise<DtoDeleteUserResponse> {
        try {

            if (!UserID.isValid(dtoRequest.id)) {
                throw new Error("El ID del usuario ha eliminar es invalido");
            }
            const user = await this.userRepo.getOneById(dtoRequest.id);
            if(!user){
                throw new Error("No existe el usuario que desa eliminar");
            }
            const process = await this.userRepo.delete(user.getId());
            if(!process){
                throw new Error("Error durante el proceso de eliminacion del usuario");
            }
            return new DtoDeleteUserResponse(user);

        } catch (error) {
            if (
                error instanceof ErrorRepositoryService
            ) {
                throw new ErrorUseCase(
                    `Error DeleteUser: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "delete" }
                );
            }
            throw new Error(error.message);
        }
    }
}