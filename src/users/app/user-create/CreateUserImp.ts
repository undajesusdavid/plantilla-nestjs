// Importamos la Interfaz para el caso de uso
import { CreateUser } from "./CreateUser";

// Importamos los DTO
import { DtoCreateUserRequest } from "./DtoCreateUserRequest";
import { DtoCreateUserResponse } from "./DtoCreateUserResponse";

// Importamos La entidad Usuario
import { User } from "../../core/User";

// Importamos los Servicios
import { UserRepository } from "../contracts/UserRepository";
import { UuidService } from "../contracts/UuidService";
import { HashedService } from "../contracts/HashedService";
import { ErrorUseCase } from "../errors/ErrorUseCase";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { ErrorUuidService } from "../errors/ErrorUuidService";
import { ErrorHashedService } from "../errors/ErrorHashedService";

// Exportamos la clase que implementa el caso de uso
export class CreateUserImp implements CreateUser {
    constructor(
        private userRepo: UserRepository,
        private uuidService: UuidService,
        private hashedService: HashedService
    ) { }

    async create(props: DtoCreateUserRequest): Promise<DtoCreateUserResponse> {
        try {

            const usernameExists = await this.userRepo.usernameExists(props.username);
            if (usernameExists) {
                throw new Error("El nombre de usuario ya existe");
            }

            const emailExists = await this.userRepo.emailExists(props.email);
            if (emailExists) {
                throw new Error("El email ya existe");
            }

            const user = new User({
                id: this.uuidService.generate(),
                username: props.username,
                password: this.hashedService.hashed(props.password),
                email: props.email,
                active: props.active,
            });

            const created = await this.userRepo.create(user);
            if (!created) {
                throw new Error("El usuario no pudo ser registrado");
            }

            return new DtoCreateUserResponse(user);

        } catch (error) {
            if (
                error instanceof ErrorRepositoryService ||
                error instanceof ErrorUuidService ||
                error instanceof ErrorHashedService
            ) {
                throw new ErrorUseCase(
                    `Error CreateUser: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "create" }
                );
            }
            throw new Error(error.message);
        }

    }
}
