import { UserID } from "src/users/core/UserID";
import { UserRepository } from "../contracts/UserRepository";
import { UpdateUser } from "./UpdateUser";
import { ErrorUseCase } from "../../../shared/app/errors/ErrorUseCase";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { UpdateUserProps } from "./UpdateUserProps";
import { User } from "src/users/core/User";

export class UpdateUserImp implements UpdateUser {

    constructor(
        private userRepo: UserRepository
    ) { }

    async update(props: UpdateUserProps): Promise<User> {
        try {
            // Validamos el ID del usuario
            if (!UserID.isValid(props.id)) {
                throw new Error("El ID del usuario ha actualizar es invalido");
            }
            const user = await this.userRepo.getOneById(props.id);

            if (!user) {
                throw new Error(`No se encontró ningún usuario con el ID: ${props.id}`);
            }

            if(props.username !== undefined) {
                user.setUsername(props.username);
            }

            if(props.email !== undefined) {
                user.setEmail(props.email);
            }

            if(props.active !== undefined) {
                user.setActive(props.active);
            }

            this.userRepo.update(user.getId(), user);

            return user;
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