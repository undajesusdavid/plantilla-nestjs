import { PERMISSION_REPOSITORY } from "src/access_control/core/permission/PermissionRepository";
import { ROLE_REPOSITORY } from "src/access_control/core/role/RoleRepository";

export const ServiceExports = [
    ROLE_REPOSITORY,
    PERMISSION_REPOSITORY
]