import { CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import "reflect-metadata";

@Injectable()
export class hasAccess implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }
    
}