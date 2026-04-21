import { CreateRoleUseCase } from '@modules/roles/app/create-role/create-role.use-case';
import { DeleteRoleUseCase } from '@modules/roles/app/delete-role/delete-role.use-case';
import { UpdateRoleUseCase } from '@modules/roles/app/update-role/update-role.use-case';

export const UseCaseExports = [
  CreateRoleUseCase,
  UpdateRoleUseCase,
  DeleteRoleUseCase,
];


