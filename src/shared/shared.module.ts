import { Module } from "@nestjs/common";
import { UuidServiceImp } from "./structure/services/UuidServiceImp";

@Module({
    providers: [UuidServiceImp],
    exports: [UuidServiceImp],
    
})
export class SharedModule {

}