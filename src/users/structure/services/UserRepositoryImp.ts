import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../app/contracts/UserRepository';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../core/User';
import { UserModel } from '../models/user.sequelize';
import { ErrorRepositoryService } from 'src/users/app/errors/ErrorRepositoryService';
import { UserMapper } from '../mappers/UserMapper';

@Injectable()
export class UserRepositoryImp implements UserRepository {

  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @Inject(UserMapper) private mapper: UserMapper,

  ) {}


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

  async update(id: string, user: User): Promise<boolean> {
    try {
      const record = await this.userModel.update({
        username: user.getUsername(),
        password: user.getPassword(),
        email: user.getEmail(),
        active: user.isActive(),
      }, {
        where: {
          id: id
        }
      });

      return !!record;

    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar actualizar el usuario',
        'USER_UPDATE_FAILED',
        { originalError: error, class: this.constructor.name, method: "update" }
      );
    }
  }


  async getOneById(id: string): Promise<User | null> {

    try {
      const record = await this.userModel.findByPk(id);
      if (!record) {
        return null;
      }
      return this.mapper.toEntity(record);
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
      return this.mapper.toEntityList(records);
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
      const record = await this.userModel.findOne({ where: { username }, include: [{
        association: 'roles',
        include: [{ association: 'permissions' }]
      }] });
      if (!record) {
        return null;
      }
      return this.mapper.toEntity(record);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el usuario por por la propiedad username',
        'USER_GET_BY_USERNAME_FAILED',
        { originalError: error, class: this.constructor.name, method: "getOneByUsername" }
      );
    }

  }

  async delete(id: string): Promise<boolean> {
    try {
      const process = await this.userModel.destroy({ where: { id } });
      return !!process;

    } catch (error) {
      throw new ErrorRepositoryService(
        `Error al intentar eliminar el usuario con ID ${id}`,
        'USER_DELETE_FAILED',
        { originalError: error, class: this.constructor.name, method: "delete" }
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
