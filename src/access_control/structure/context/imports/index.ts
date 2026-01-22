//Modulos externos
import { SharedModule } from "src/shared/structure/context/shared.module"
import { DatabaseModule } from "src/database/structure/context/sequealize.module"

import { Models } from "./models"


export const AccessControlImports = [
    DatabaseModule,
    SharedModule,
    Models
]