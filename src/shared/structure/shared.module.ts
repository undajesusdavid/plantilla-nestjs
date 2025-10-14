import { Module } from "@nestjs/common";
import { UuidServiceImp } from "./services/UuidServiceImp";

@Module({
    providers: [UuidServiceImp],
    exports: [UuidServiceImp],
    
})
export class SharedModule {

}