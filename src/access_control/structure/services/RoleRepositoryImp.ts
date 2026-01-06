import { Inject, Injectable } from "@nestjs/common";
import { RoleRepository } from "../../app/contracts/RoleRepository";
import { Role } from "src/access_control/core/Role";
import { RoleID } from "src/access_control/core/RoleId";
import { RoleModel } from "../models/role.sequelize";
import { RoleMapper } from "../mappers/RoleMapper";
import { ErrorRepositoryService } from "src/shared/app/errors/ErrorRepositoryService";

@Injectable()
export class RoleRepositoryImp implements RoleRepository {

    constructor(
        @Inject(RoleMapper) private mapper: RoleMapper
    ) { }

    async getAll(): Promise<Role[]> {
        try {
            const roles = await RoleModel.findAll({});
            return this.mapper.toEntityList(roles);
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar optener todos los Roles',
                'ROLES_GETALL_FAILED',
                { originalError: error, class: this.constructor.name, method: "getAll" }
            );
        }
    }
    async getOneById(id: RoleID): Promise<Role | null> {

        try {
            const role = await RoleModel.findByPk(id.toString());
            if (!role) {
                return null;
            }
            return this.mapper.toEntity(role);

        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar optener el rol por ID',
                'ROLES_GETONEBYID_FAILED',
                { originalError: error, class: this.constructor.name, method: "getOneById" }
            );
        }
    }
    async getOneByName(name: string): Promise<Role | null> {
        try {
            const role = await RoleModel.findOne({ where: { name } });
            if (!role) {
                return null;
            }
            return new RoleMapper().toEntity(role);
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar optener el rol por nombre',
                'ROLES_GETONEBYNAME_FAILED',
                { originalError: error, class: this.constructor.name, method: "getOneByName" }
            );
        }
    }
    async changeRoleStatus(id: RoleID, status: boolean): Promise<boolean> {
        try {
            const [updatedRows] = await RoleModel.update(
                { isActive: status },
                { where: { id: id.toString() } }
            );
            return updatedRows > 0;
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar cambiar el estado del rol',
                'ROLES_CHANGEROLESTATUS_FAILED',
                { originalError: error, class: this.constructor.name, method: "changeRoleStatus" }
            );
        }
    }
}