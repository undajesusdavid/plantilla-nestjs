import { GetPermissionsUseCase } from "@src/modules/permissions/app/get-permissions/get-permissions.use-case";
import { PERMISSION_REPOSITORY, PermissionRepository } from "@src/modules/permissions/core/contracts/PermissionRepository";

export const UseCasesProvider = [
    {
        provide: GetPermissionsUseCase,
        useFactory: (repo: PermissionRepository) => new GetPermissionsUseCase(repo),
        inject: [PERMISSION_REPOSITORY],
    },
];


