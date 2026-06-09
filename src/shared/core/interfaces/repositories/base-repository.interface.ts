import { IReadRepository } from "./read-repository.interface";
import { IValidationRepository } from "./validation-repository.interface";
import { IWriteRepository } from "./write-repository.interface";

export interface IBaseRepository<T, ID = string | number> 
  extends IReadRepository<T, ID>, 
          IWriteRepository<T, ID>, 
          IValidationRepository<ID> {}
