import { Module } from "@nestjs/common";
import { UuidServiceImp } from "../services/UuidServiceImp";
import { UUID_SERVICE } from "src/shared/core/interfaces/uuid-service.interface";



import { SequealizeModule } from "../persistence/sequelize/sequealize.module";
import { UNIT_OF_WORK } from "../../core/interfaces/unit-of-work.interface";
import { SequelizeUnitOfWork } from "../persistence/sequelize/sequealize-unit-of-work.service";


@Module({
    imports: [
        SequealizeModule,
    ],
    providers: [
        {
            provide: UUID_SERVICE,
            useClass: UuidServiceImp,
        },
        {
            provide: UNIT_OF_WORK,
            useClass: SequelizeUnitOfWork,
        }
    ],
    exports: [UUID_SERVICE, UNIT_OF_WORK],

})
export class SharedModule { }