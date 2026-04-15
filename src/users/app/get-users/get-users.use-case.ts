import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { User } from 'src/users/core/entities/User';
import type { UserRepository } from '../../core/contracts/UserRepository';
import { GetUsersQuery } from './get-users.query';

export class GetUsersUseCase extends BaseUseCase<GetUsersQuery, User[]> {
  static readonly HANDLED_QUERY = GetUsersQuery;

  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  protected async internalExecute(): Promise<User[]> {
  
    const users = await this.userRepository.findAll();
    return users.filter((user) => !user.getRoles().includes('root')); // Ejemplo: solo devolver usuarios activos
    // Example: filter by name, email, or other properties in FilterUsers
   
  }
}
