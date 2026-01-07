// Importamos la Interfaz para el caso de uso
import { CreateUser } from "./CreateUser";

// Importamos La entidad Usuario
import { User } from "../../core/entities/User";

// Importamos los Servicios
import { UserRepository } from "../../core/contracts/UserRepository";
import { UuidService } from "src/shared/app/contracts/UuidService";
import { HashedService } from "../../core/contracts/HashedService";
import { ErrorUseCase } from "../../../shared/app/errors/ErrorUseCase";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { ErrorUuidService } from "src/shared/app/errors/ErrorUuidService";
import { ErrorHashedService } from "../errors/ErrorHashedService";
import { UserID } from "src/users/core/entities/UserID";
import { CreateUserProps } from "./CreateUserProps";

// Exportamos la clase que implementa el caso de uso
export class CreateUserImp implements CreateUser {
    constructor(
        private userRepo: UserRepository,
        private uuidService: UuidService,
        private hashedService: HashedService
    ) { }

    async create(props: CreateUserProps): Promise<User> {
        try {

            const usernameExists = await this.userRepo.usernameExists(props.username);
            if (usernameExists) {
                throw new Error("El nombre de usuario ya existe");
            }

            const emailExists = await this.userRepo.emailExists(props.email);
            if (emailExists) {
                throw new Error("El email ya existe");
            }

            const id = this.uuidService.generateV7();
            if(!UserID.isValid(id)){
                throw new Error("El ID generado no es una version de UUID valida")
            }
            
            const user = new User({
                id: UserID.create(id),
                username: props.username,
                password: this.hashedService.hashed(props.password),
                email: props.email,
                active: true, // aca debo agregar una opcion de configuracion futura
            });

            const created = await this.userRepo.create(user);
            if (!created) {
                throw new Error("El usuario no pudo ser registrado");
            }

            return user;

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
