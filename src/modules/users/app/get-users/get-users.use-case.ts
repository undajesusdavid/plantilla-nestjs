import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { User } from '@modules/users/core/entities/User';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { GetUsersQuery } from './get-users.query';
import { PaginatedResponse, PaginationMeta } from '@src/shared/app/use-cases/response/paginated.response';

export class GetUsersUseCase extends BaseUseCase<GetUsersQuery, PaginatedResponse<User>> {
  static readonly HANDLED_QUERY = GetUsersQuery;

  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  private isRoot = (user: User) => user.getRoles().some(r => r.name === 'root');

  protected async internalExecute(query: GetUsersQuery ): Promise<PaginatedResponse<User>> {
   
    const {items, pagination} = await this.userRepository.findPaginated({  searchFields:[
      'username', 'email'
    ], ...query});
  
    return new  PaginatedResponse(
      items.filter(user => !this.isRoot(user)),
      new PaginationMeta(pagination)
    ) 
   
  }
}


