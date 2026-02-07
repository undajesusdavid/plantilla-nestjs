// Servicios
import { IUnitOfWork, UNIT_OF_WORK } from "src/shared/core/interfaces/unit-of-work.interface";
import { ROLE_REPOSITORY, RoleRepository } from "src/access_control/core/role/RoleRepository";
import { PERMISSION_REPOSITORY, PermissionRepository } from "src/access_control/core/permission/PermissionRepository";
import { UUID_SERVICE, IUuidService } from "src/shared/core/interfaces/uuid-service.interface";

// Use Cases
import { CREATE_ROLE } from "src/access_control/app/create-role/create-role.constants";
import { CreateRoleUseCase } from "src/access_control/app/create-role/create-role.use-case";

import { DELETE_ROLE } from "src/access_control/app/delete-role/delete-role.constants";
import { DeleteRoleUseCase } from "src/access_control/app/delete-role/delete-role.use-case";
import { UPDATE_ROLE } from "src/access_control/app/role-update/update-role.constants";
import { UpdateRoleUseCase } from "src/access_control/app/role-update/update-role.use-case";


export const UseCases = [
    {
        provide: CREATE_ROLE,
        useFactory: (
            uow: IUnitOfWork,
            uuid: IUuidService, 
            roleRepo: RoleRepository,
            permissionRepo: PermissionRepository

        ) => new CreateRoleUseCase(uow,uuid,roleRepo,permissionRepo),
        inject: [UNIT_OF_WORK, UUID_SERVICE, ROLE_REPOSITORY, PERMISSION_REPOSITORY],
    },
    {
        provide: UPDATE_ROLE,
        useFactory: (
            r: RoleRepository,
            p: PermissionRepository,
            uow: IUnitOfWork) => new UpdateRoleUseCase(r,p,uow),
        inject: [ROLE_REPOSITORY, PERMISSION_REPOSITORY, UNIT_OF_WORK],
    },
    {
        provide: DELETE_ROLE,
        useFactory: (roleRepo: RoleRepository) => new DeleteRoleUseCase(roleRepo),
        inject: [ROLE_REPOSITORY],
    },
];

export const UseCaseExport = [
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE
]