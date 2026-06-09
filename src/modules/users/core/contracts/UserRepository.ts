import { IBaseRepository } from '@src/shared/core/interfaces/repositories/base-repository.interface';
import { User } from '@modules/users/core/entities/User';

export const USER_REPOSITORY = Symbol('UserRepository');

export interface UserRepository extends IBaseRepository<User, string> {
  create(user: User): Promise<boolean>;
  findByUsername(username: string): Promise<User | null>;
  usernameExists(username: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
  assignRoles(userId: string, RoleIds: string[]): Promise<void>;
}


