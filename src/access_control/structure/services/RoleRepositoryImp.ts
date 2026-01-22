import { Inject, Injectable } from "@nestjs/common";
import { RoleRepository } from "../../core/role/RoleRepository";
import { Role } from "../../core/role/Role";
import { RoleModel } from "../models/role.sequelize";
import { RoleMapper } from "../mappers/RoleMapper";
import { ErrorRepositoryService } from "src/shared/app/errors/ErrorRepositoryService";
import { InjectModel } from "@nestjs/sequelize";


@Injectable()
export class RoleRepositoryImp implements RoleRepository {

    constructor(
        @Inject(RoleMapper) private mapper: RoleMapper,
        @InjectModel(RoleModel) private readonly roleModel: typeof RoleModel
    ) { }

    

    async saveRoleUpdated(role: Role): Promise<boolean> {
        const roleModel = this.mapper.toModel(role);
        roleModel.isNewRecord = false;
        try {
            await roleModel.save();
            return true;
        }catch(error){
            return false;
        }
    }

    async saveAssignedPermissions(roleId: string, permissionIds: number[]): Promise<boolean> {
        const role = await this.roleModel.findByPk(roleId);
        if (!role) return false;
        try {
            await role.$set("permissions", permissionIds);
            return true;
        } catch (error) {
            return false;
        }
    }

    async create(role: Role, permissions: number[]): Promise<Role> {
        try {
            const roleModel = this.mapper.toModel(role);
            await roleModel.save();
            if (permissions) {
                await roleModel.$set("permissions", permissions);
            }
            const createdRole = await roleModel.reload({ include: { association: "permissions" } });
            return this.mapper.toEntity(createdRole);
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar registrar el rol',
                'ROLES_CREATE_FAILED',
                { originalError: error, class: this.constructor.name, method: "create" }
            );
        }
    }



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
    async getOneById(id: string): Promise<Role | null> {

        try {
            const role = await RoleModel.findByPk(id);
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
    async changeRoleStatus(id: string, status: boolean): Promise<boolean> {
        try {
            const [updatedRows] = await RoleModel.update(
                { isActive: status },
                { where: { id: id } }
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