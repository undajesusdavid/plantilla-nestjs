//Modulos externos
import { SharedModule } from "src/shared/infrastructure/context/shared.module"
import { DatabaseModule } from "src/database/infrastructure/context/database.module"

import { Models } from "./models"


export const AccessControlImports = [
    DatabaseModule,
    SharedModule,
    Models
]