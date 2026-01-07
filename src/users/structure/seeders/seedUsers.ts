import { Transaction } from "sequelize";
import { UserModel } from "../models/user.sequelize";
import { RoleModel } from "../../../access_control/structure/models/role.sequelize";
import { USERS } from "src/users/core/rules/User.seeds";
import { UuidServiceImp } from "src/shared/structure/services/UuidServiceImp";
import { HashedServiceImp } from "../services/HashedServiceImp";

export const SeedUsersToken = Symbol("seedUsers");

export async function seedUsers(transaction: Transaction) {
    try {
        await populateTable(transaction);
    } catch (error) {
        console.error("Error en la funcion de poblar tabla de usuarios");
    }

    try {
       await createRelations(transaction);
    } catch (error) {
        console.error("Error en la funcion que crea las relaciones de usuarios");
    }
}

const populateTable = async (transaction: Transaction) => {

    const usersData = Object.values(USERS).map((u) => ({
        id: new UuidServiceImp().generateV7(),
        username: u.username,
        email: u.email,
        password: new HashedServiceImp().hashed(u.password),
        active: true,
    }));

    for (const u of usersData) {
        await UserModel.upsert(u, { transaction });
    }

    console.log("✅ Tabla de usuarios poblada!.");

}

const createRelations = async (transaction: Transaction) => {
    const query = await Promise.all([
        UserModel.findAll({ transaction }),
        RoleModel.findOne({
            where: {
                name: "root",
            }, transaction
        }),
    ]);

    const [allUsers, rootRole] = query;

    for (const user of allUsers) {
        switch (user.username) {
            case USERS.USER_ROOT.username:
                await user.$set('roles', rootRole, { transaction });
                console.log("✅ Rol asignado a usuario ROOT");
            break;
        }
    }
}