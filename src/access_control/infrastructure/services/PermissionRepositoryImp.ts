import { Injectable } from "@nestjs/common";
import { PermissionRepository } from "src/access_control/core/permission/PermissionRepository";
import { PermissionID } from "src/access_control/core/permission/PermissionId";
import { PermissionModel } from "../models/permission.sequelize";
import { ErrorRepositoryService } from "src/shared/app/errors/ErrorRepositoryService";
import { Op } from 'sequelize';

@Injectable()
export class PermissionRepositoryImp implements PermissionRepository {

    async getAll(): Promise<PermissionModel[]> {
        try {
            const permissions = await PermissionModel.findAll({});
            return permissions;
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar optener todos los permisos',
                'PERMISSION_GETALL_FAILED',
                { originalError: error, class: this.constructor.name, method: "findAll" }
            );
        }
    }

    async getOneById(id: PermissionID): Promise<PermissionModel | null> {
        try {
            const permissionId = id.toString();
            const permission = await PermissionModel.findByPk(permissionId);
            return permission;
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar optener el permiso por ID',
                'PERMISSION_GETONEBYID_FAILED',
                { originalError: error, class: this.constructor.name, method: "getOneById" }
            );
        }
    }

    async getOneByName(name: string): Promise<PermissionModel | null> {
        try {
            const permission = await PermissionModel.findOne({ where: { name } });
            return permission;
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar optener el permiso por nombre',
                'PERMISSION_GETONEBYNAME_FAILED',
                { originalError: error, class: this.constructor.name, method: "getOneByName" }
            );
        }
    }
    async changePermissionStatus(id: PermissionID, status: boolean): Promise<boolean> {
        try {
            const permissionId = id.toString();
            const [updatedRowsCount] = await PermissionModel.update(
                { isActive: status },
                { where: { id: permissionId } }
            );
            return updatedRowsCount > 0;

        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar cambiar el estado del permiso',
                'PERMISSION_CHANGESTATUS_FAILED',
                { originalError: error, class: this.constructor.name, method: "changePermissionStatus" }
            );
        }
    }

    async findExistingIds(ids: number[]): Promise<number[]> {
        const uniqueIds = [...new Set(ids)];

        const permissions = await PermissionModel.findAll({
            where: {
                id: { [Op.in]: uniqueIds }
            },
            attributes: ['id'], // Optimización: no traemos descripción ni otros campos
            raw: true
        });

        return permissions.map(p => p.id);
    }

} 