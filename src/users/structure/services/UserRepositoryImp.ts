import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../app/contracts/UserRepository';
import { User } from '../../core/User';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../user.sequealize';
import { ErrorRepositoryService } from 'src/users/app/errors/ErrorRepositoryService';
import { Uuid } from 'src/shared/core/Uuid';

@Injectable()
export class UserRepositoryImp implements UserRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) { }

  private toDomain(record: UserModel): User {
    if(!Uuid.isValid(record.id)){
      throw new Error("El id del usuario almacenado no es un uuid valido")
    }
    return new User({
      id: Uuid.create(record.id),
      username: record.username,
      password: record.password,
      email: record.email,
      active: record.active,
    });
  }
  async create(user: User): Promise<boolean> {
    try {
      const record = await this.userModel.create({
        id: user.getId(),
        username: user.getUsername(),
        password: user.getPassword(),
        email: user.getEmail(),
        active: user.isActive(),
      });
      return !!record;

    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar crear el usuario',
        'USER_CREATE_FAILED',
        { originalError: error, class: this.constructor.name, method: "create" }
      );
    }
  }


  async getOneById(id: string): Promise<User> {
    try {
      const record = await this.userModel.findByPk(id);
      if (!record) {
        throw new Error(`No se encontró ningún usuario con el ID: ${id}`);
      }
      return this.toDomain(record);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener un usuario',
        'USER_GET_FAILED',
        { originalError: error, class: this.constructor.name, method: "getOne" }
      );
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const records = await this.userModel.findAll();
      return records.map(this.toDomain);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener todos los usuarios',
        'USER_GETALL_FAILED',
        { originalError: error, class: this.constructor.name, method: "getAll" }
      );
    }
  }

  async getOneByUsername(username: string): Promise<User | null> {
    try {
      const record = await this.userModel.findOne({where: {username}});
      if (!record) {
        return null;
      }
      return this.toDomain(record);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el usuario por por la propiedad username',
        'USER_GET_BY_USERNAME_FAILED',
        { originalError: error, class: this.constructor.name, method: "getOneByUsername" }
      );
    }

  }

  async usernameExists(username: string): Promise<boolean> {
    try {
      const record = await this.userModel.findOne({ where: { username } });
      return !!record;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar comprobar si el nombre de usuario ya existe',
        'USERNAME_EXISTS_FAILED',
        { originalError: error, class: this.constructor.name, method: "usernameExists" }
      );
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      const record = await this.userModel.findOne({ where: { email } });
      return !!record;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar comprobar si el email ya existe',
        'EMAIL_EXISTS_FAILED',
        { originalError: error, class: this.constructor.name, method: "emailExists" }
      );
    }
  }

}
