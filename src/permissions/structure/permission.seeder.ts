import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { PermissionModel } from './permission.sequealize';

//import { AllowedActionOptions } from '../core/RegisteredPermissionOptions';
//import { ModuleAndResources } from "../core/RegisteredPermissionOptions";
//import { UuidServiceImp } from 'src/shared/structure/services/UuidServiceImp';

@Injectable()
export class PermissionSeederService implements OnApplicationBootstrap {
    constructor(private readonly sequelize: Sequelize) { }

    async onApplicationBootstrap() {
        const tableExists = await this.sequelize.getQueryInterface().showAllTables()
            .then(tables => tables.includes('Permissions'));

        if (!tableExists) {
            console.log('Tabla Permissions no existe. Se omite el seeding.');
            return;
        }

        const count = await PermissionModel.count();
        if (count > 0) {
            console.log('Tabla Permissions ya tiene datos. Se omite el seeding.');
            return;
        }

        // Implementar

        console.log('Permisos por defecto registrados.');
    }
}
