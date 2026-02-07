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

    async findById(id: string): Promise<Role | null> {
        try {
            const role = await this.roleModel.findByPk(id, { include: { association: "permissions" } });
            if (!role) return null;
            return this.mapper.toEntity(role);
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar buscar el rol por ID',
                'ROLES_FINDBYID_FAILED',
                { originalError: error, class: this.constructor.name, method: "findById" }
            );
        }
    }

    async save(role: Role): Promise<boolean> {

        const record = await this.roleModel.findByPk(role.getId());
        if (record) {
            await record.update({
                name: role.getName(),
                description: role.getDescription(),
                isActive: role.getIsActive()
            });
            return true;
        }

        // Creamos uno nuevo
        await this.roleModel.create({
            id: role.getId(),
            name: role.getName(),
            description: role.getDescription(),
            isActive: role.getIsActive()
        }, { returning: false })

        return true;
    }



    async delete(id: string): Promise<boolean> {
        const process = await this.roleModel.destroy({ where: { id: id } });
        if (process > 0) {
            return true;
        } else {
            return false;
        }
    }

    async saveRoleUpdated(role: Role): Promise<boolean> {
        const roleModel = this.mapper.toModel(role);
        roleModel.isNewRecord = false;
        try {
            await roleModel.save();
            return true;
        } catch (error) {
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

    async create(role: Role): Promise<void> {
        const transaction = await this.roleModel.sequelize!.transaction();
        try {
            const createdRole = await this.roleModel.create({
                id: role.getId(),
                name: role.getName(),
                description: role.getDescription(),
                isActive: role.getIsActive()
            }, { transaction });

            await (createdRole as any).setPermissions(role.getPermissions(), { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.log("Error en metodo create del repositorio de roles ", error);
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