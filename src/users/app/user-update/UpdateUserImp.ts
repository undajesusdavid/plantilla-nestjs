import { UserID } from "src/users/core/UserID";
import { UserRepository } from "../contracts/UserRepository";
import { DtoUpdateUserRequest } from "./DtoUpdateUserRequest";
import { DtoUpdateUserReponse } from "./DtoUpdateUserResponse";
import { UpdateUser } from "./UpdateUser";
import { ErrorUseCase } from "../errors/ErrorUseCase";

export class UpdateUserImp implements UpdateUser {

    constructor(
        private userRepo: UserRepository
    ){}

    // update(dtoRequest: DtoUpdateUserRequest): Promise<DtoUpdateUserReponse> {
    //     if(UserID.isValid(dtoRequest.id)){
    //         throw new ErrorUseCase("El ID del usuario actualizar es invalido");
    //     }


    // }
}