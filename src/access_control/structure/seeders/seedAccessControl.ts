import { Op, Transaction } from "sequelize";
//DATA
import { PERMISSIONS } from "../../core/rules/Permission.seeds";
import { ROLES } from "../../core/rules/roles.seeds";
//MODELS
import { RoleModel } from "../models/role.sequelize";
import { PermissionModel } from "../models/permission.sequelize";
import { UuidServiceImp } from "src/shared/structure/services/UuidServiceImp";

export const seedAccessControlToken = "seedAccessControl";

export async function seedAccessControl(transaction: Transaction) {
    try {
        await populateTables(transaction);
    } catch (error) {
        console.error(
            "Error en la funcion de poblar las tablas de roles y permisos"
        );
    }

    try {
        await createRelations(transaction);
    } catch (error) {
        console.error(
            "Error en la funcion que crea las relaciones de roles y permisos"
        );
    }
}

const populateTables = async (transaction: Transaction) => {
    // Poblar permisos con UPSERT (Postgres)
    const permissionsData = Object.values(PERMISSIONS).map((p) => ({
        name: p.name,
        description: p.description,
        isActive: true,
    }));

    for (const p of permissionsData) {
        await PermissionModel.upsert(p, { transaction });
    }

    console.log("✅ Tabla de permisos poblada!.");

    // Poblar roles con UPSERT (Postgres)
    const rolesData = Object.values(ROLES).map((r) => ({
        id: new UuidServiceImp().generateUUID(),
        name: r.name,
        description: r.description,
        isActive: true,
    }));

    for (const r of rolesData) {
        await RoleModel.upsert(r, { transaction });
    }

    console.log("✅ Tabla de roles poblada!.");

}

const createRelations = async (transaction: Transaction) => {
    const EXCLUDE_ROLE_ADMIN = ['*', ':role', ':permission'];
    const INCLUDE_ROLE_USER = ['nothing...'];


    // Lecturas en paralelo (más eficiente)
    const query = await Promise.all([
        //roles
        RoleModel.findAll({ transaction }),
        //permissions de root
        PermissionModel.findAll({
            where: { name: PERMISSIONS.ALL.name },
            transaction
        }),
        //permissions de admin
        PermissionModel.findAll({
            where: {
                [Op.and]: [
                    ...EXCLUDE_ROLE_ADMIN.map(word => ({
                        name: { [Op.notILike]: `%${word}%` },
                    })),
                ],
            },
            transaction,
        }),
        //permissions de user
        PermissionModel.findAll({
            where: {
                [Op.and]: [
                    ...INCLUDE_ROLE_USER.map(word => ({
                        name: { [Op.iLike]: `%${word}%` },
                    })),
                ],
            },
            transaction,
        })
    ]);

    const [
        allRoles,
        rootPermissions,
        adminPermissions,
        userPermissions
    ] = query;

    // Relacionar roles con permisos
    for (const role of allRoles) {
        switch (role.name) {
            case ROLES.ROOT.name:
                await role.$set("permissions", rootPermissions, { transaction });
                console.log("✅ Permisos asignados a rol ROOT");
                break;
            case ROLES.ADMIN.name:
                await role.$set("permissions", adminPermissions, { transaction });
                console.log("✅ Permisos asignados a rol ADMIN");
                break;
            case ROLES.USER.name:
                await role.$set("permissions", userPermissions, { transaction });
                console.log("✅ Permisos asignados a rol USER");
                break;
        }
    }
}
