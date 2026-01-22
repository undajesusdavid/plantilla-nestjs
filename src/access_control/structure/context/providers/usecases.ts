// Servicios
import { RoleRepositoryImp } from "../../services/RoleRepositoryImp";

import { CreateRoleToken } from "src/access_control/app/role-create/CreateRole";
import { CreateRoleImp } from "src/access_control/app/role-create/CreateRoleImp";
import { UpdateRoleToken } from "src/access_control/app/role-update/UpdateRole";
import { UpdateRoleImp } from "src/access_control/app/role-update/UpdateRoleImp";
import { SequelizeTransaction } from "src/database/structure/services/SequelizeTransaction";
import { UuidServiceImp } from "src/shared/structure/services/UuidServiceImp";
import { PermissionRepositoryImp } from "../../services/PermissionRepositoryImp";
import { DeleteRoleToken } from "src/access_control/app/role-delete/DeleteRole";
import { DeleteRoleImp } from "src/access_control/app/role-delete/RoleDeleteImp";

export const UseCases = [
    {
        provide: CreateRoleToken,
        useFactory: (uuid: UuidServiceImp, repo: RoleRepositoryImp,) => new CreateRoleImp(uuid,repo),
        inject: [UuidServiceImp, RoleRepositoryImp],
    },
    {
        provide: UpdateRoleToken,
        useFactory: (
            r: RoleRepositoryImp,
            p: PermissionRepositoryImp,
            tm: SequelizeTransaction) => new UpdateRoleImp(r,p,tm),
        inject: [RoleRepositoryImp, PermissionRepositoryImp, SequelizeTransaction],
    },
    {
        provide: DeleteRoleToken,
        useFactory: (rp: RoleRepositoryImp) => new DeleteRoleImp(rp),
        inject: [RoleRepositoryImp],
    },
];

export const UseCaseExport = [
    CreateRoleToken,
    UpdateRoleToken,
    DeleteRoleToken
]