import { AuthTokenService } from "../contracts/AuthTokenService";
import { HashedService } from "../contracts/HashedService";
import { UserRepository } from "../contracts/UserRepository";
import { ErrorAuthTokenService } from "../errors/ErrorAuthTokenService";
import { ErrorHashedService } from "../errors/ErrorHashedService";
import { ErrorRepositoryService } from "../errors/ErrorRepositoryService";
import { ErrorUseCase } from "../../../shared/app/errors/ErrorUseCase";
import { AuthUser } from "./AuthUser";
import { DtoCredentialsRequest } from "./DtoCredentialsRequest";
import { DtoPayloadResponse } from "./DtoPayloadResponse";

export class AuthUserImp implements AuthUser {

    constructor(
        private userRepo: UserRepository,
        private authToken: AuthTokenService,
        private hashed: HashedService
    ) { }

    async login(credentials: DtoCredentialsRequest): Promise<DtoPayloadResponse> {
        try {

            const user = await this.userRepo.getOneByUsername(credentials.username);
            if (!user) {
                throw new Error("Nombre de usuario invalido");
            }
            if (!user.isActive()) {
                throw new Error("El usuario no esta activo");
            }

            const isPassword = this.hashed.compare(credentials.password, user.getPassword());
            if (!isPassword) {
                throw new Error("La contraseña es invalida");
            }

            const userId = user.getId();
            const userName = user.getUsername();
            const token = await this.authToken.auth({ id: userId, username: userName });
            return new DtoPayloadResponse(token, userId, userName);

        } catch (error) {
            if (
                error instanceof ErrorAuthTokenService ||
                error instanceof ErrorRepositoryService ||
                error instanceof ErrorHashedService
            ) {
                throw new ErrorUseCase(
                    `Error AuthUser-login: ${error.message}`,
                    `USE_CASE_FAILED ->  ${error.name}`,
                    { originalError: error, class: this.constructor.name, method: "login" }
                );
            }
            throw new Error(error.message);
        }
    }
}