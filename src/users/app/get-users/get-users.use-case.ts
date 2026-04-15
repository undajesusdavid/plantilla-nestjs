import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { User } from 'src/users/core/entities/User';
import { UserRepository } from '../../core/contracts/UserRepository';

export class GetUsersUseCase extends BaseUseCase<void, User[]> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  protected async internalExecute(): Promise<User[]> {
  
    const users = await this.userRepository.findAll();
    return users.filter((user) => !user.getRoles().includes('root')); // Ejemplo: solo devolver usuarios activos
    // Example: filter by name, email, or other properties in FilterUsers
   
  }
}
