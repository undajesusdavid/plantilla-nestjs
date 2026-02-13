import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PermissionRepository } from "src/access_control/core/permission/PermissionRepository";
import { PermissionModel, PermissionModelAttributes } from "../../models/sequelize/permission.sequelize";
import { ErrorRepositoryService } from "src/shared/app/errors/ErrorRepositoryService";
import { BaseSequelizeRepository } from "src/shared/infrastructure/persistence/sequelize/sequelize.base-repository";
import { Permission } from "src/access_control/core/permission/Permission";
import { PermissionMapper } from "../../mappers/permission-mapper.sequelize";
import { Op } from "sequelize";

// ... (tus imports se mantienen igual)

@Injectable()
export class PermissionRepositoryImp 
    extends BaseSequelizeRepository<Permission, PermissionModelAttributes, PermissionModel, number> 
    implements PermissionRepository {

    constructor(
        @InjectModel(PermissionModel)
        private readonly permissionModel: typeof PermissionModel,
    ) {
        super(permissionModel, new PermissionMapper());
    }

    async findByName(name: string): Promise<Permission | null> {
        try {
            const record = await this.modelEntity.findOne({ 
                where: { name }, 
                transaction: this.currentTransaction 
            });
            return record ? this.mapper.toDomain(record.get({ plain: true })) : null;
        } catch (error) {
            throw new ErrorRepositoryService(
                'Error al intentar obtener el permiso por nombre',
                'PERMISSION_FINDBYNAME_FAILED',
                { originalError: error, class: this.constructor.name, method: "findByName" }
            );
        }
    }

    async changePermissionStatus(id: string, status: boolean): Promise<boolean> {
        try {
            const [updatedRowsCount] = await this.modelEntity.update(
                { isActive: status },
                {
                    where: { id },
                    transaction: this.currentTransaction
                }
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

        const permissions = await this.modelEntity.findAll({
            where: {
                id: { [Op.in]: uniqueIds }
            },
            transaction: this.currentTransaction,
            attributes: ['id'],
            raw: true
        });

        return permissions.map((p: any) => p.id);
    }
}