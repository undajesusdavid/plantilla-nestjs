//Modulos externos
import { SharedModule } from "src/shared/structure/context/shared.module"
//Modelos de sequealize
import { Models } from "./model.register"


export const UserImports = [
    SharedModule,
    Models
]