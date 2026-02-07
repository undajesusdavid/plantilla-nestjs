import { Module } from "@nestjs/common";
import { UuidServiceImp } from "../services/UuidServiceImp";
import { UUID_SERVICE } from "src/shared/core/interfaces/uuid-service.interface";

@Module({
    providers: [
        {
            provide: UUID_SERVICE,
            useClass: UuidServiceImp,
        }
    ],
    exports: [UUID_SERVICE],
    
})
export class SharedModule {}