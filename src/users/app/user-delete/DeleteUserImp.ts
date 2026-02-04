import { UserRepository } from "../../core/contracts/UserRepository";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { ErrorUseCase } from "src/shared/app/errors/ErrorUseCase";
import { DeleteUser } from "./DeleteUser";
import { UserID } from "src/users/core/entities/value-objects/UserID";
import { User } from "src/users/core/entities/User";

export class DeleteUserImp implements DeleteUser {

    constructor(
        private userRepo: UserRepository
    ) { }

    async delete(id: string): Promise<User> {
        try {
            const user = await this.userRepo.getOneById(id);
            if(!user){
                throw new Error("No existe el usuario que desa eliminar");
            }
            const process = await this.userRepo.delete(user.getId());
            if(!process){
                throw new Error("Error durante el proceso de eliminacion del usuario");
            }
            return user;

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