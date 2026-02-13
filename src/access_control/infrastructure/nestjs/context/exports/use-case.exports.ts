import { CreateRoleUseCase } from "src/access_control/app/create-role/create-role.use-case";
import { DeleteRoleUseCase } from "src/access_control/app/delete-role/delete-role.use-case";
import { UpdateRoleUseCase } from "src/access_control/app/update-role/update-role.use-case";

export const UseCaseExports = [
    CreateRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase
]