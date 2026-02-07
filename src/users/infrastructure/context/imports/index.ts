//Modulos externos
import { SharedModule } from "src/shared/infrastructure/context/shared.module"
//Modelos de sequealize
import { Models } from "./model.register"


export const UserImports = [
    SharedModule,
    Models
]