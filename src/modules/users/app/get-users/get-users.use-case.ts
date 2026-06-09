import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { User } from '@modules/users/core/entities/User';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { GetUsersQuery } from './get-users.query';
import { getUsersResponse } from './get-users.response';

export class GetUsersUseCase extends BaseUseCase<GetUsersQuery, getUsersResponse> {
  static readonly HANDLED_QUERY = GetUsersQuery;

  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  private isRoot = (user: User) => user.getRoles().some(r => r.name === 'root');

  protected async internalExecute(query: GetUsersQuery ): Promise<getUsersResponse> {
    
    const {limit, page, search} = query;
    

    const result = await this.userRepository.findPaginated({page: 0, limit:5});
    
    return {
      users: result.items.filter(user => !this.isRoot(user)),
      total: result.total
    } 
   
  }
}


