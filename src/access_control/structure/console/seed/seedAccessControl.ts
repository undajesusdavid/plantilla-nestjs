//DATA
import { PERMISSIONS } from "../../../core/Permission.seeds";
import { ROLES } from "../../../core/roles.seeds";
//MODELS
import { RoleModel } from "../../models/role.sequelize";
import { PermissionModel } from "../../models/permission.sequelize";
//ERRORS
import { ErrorConsole } from "src/shared/app/errors/ErrorConsole";

export async function seedAccessControl() {

    const sequelize = PermissionModel.sequelize;
    if (!sequelize) {
        throw new Error("No se pudo obtener la instancia de Sequelize");
    }

    const transaction = await sequelize.transaction();

    try {
        // Poblar permisos con UPSERT (Postgres)
        const permissionsData = Object.values(PERMISSIONS).map((p) => ({
            name: p.name,
            description: p.description,
            isActive: true,
        }));

        for (const p of permissionsData) {
            await PermissionModel.upsert(p, { transaction });
        }

        // Poblar roles con UPSERT (Postgres)
        const rolesData = Object.values(ROLES).map((r) => ({
            name: r.name,
            description: r.description,
            isActive: true,
        }));

        for (const r of rolesData) {
            await RoleModel.upsert(r, { transaction });
        }

        // Lecturas en paralelo (más eficiente)
        const [allPermissions, allRoles] = await Promise.all([
            PermissionModel.findAll({ transaction }),
            RoleModel.findAll({ transaction }),
        ]);

        // Relacionar roles con permisos
        for (const role of allRoles) {
            switch (role.name) {
                case ROLES.ROOT.name:
                    // ROOT obtiene todos los permisos
                    await role.$set("permissions", allPermissions, { transaction });
                    break;

                // Ejemplo de extensión:
                // case ROLES.ADMIN.name:
                //   await role.$set("permissions", allPermissions.filter(p => p.name !== PERMISSIONS.DELETE_USER.name), { transaction });
                //   break;
                // case ROLES.USER.name:
                //   await role.$set("permissions", allPermissions.filter(p => p.name === PERMISSIONS.READ_USERS.name), { transaction });
                //   break;
            }
        }

        await transaction.commit();
        console.log("✅ Seeding completed!");

    } catch (error) {
        await transaction.rollback();
        throw new ErrorConsole(
            "Error al intentar ejecutar los seeders de access control",
            "ACCESSCONTROL_SEEDER_FAILED",
            { originalError: error, class: "AccessControlSeeder", method: "seedAccessControl" }
        );
    }
}
