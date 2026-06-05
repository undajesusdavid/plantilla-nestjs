import { UserListExportPdf } from "@src/modules/reports/app/user-reports/user-list-export.pdf";
import { Readable } from "stream";


export class UserListPdfMake implements UserListExportPdf {
    constructor() {
        // Aquí podrías inyectar cualquier dependencia necesaria, como un repositorio de usuarios
    }
    export(): Promise<Readable> {
        throw new Error("Method not implemented.");
    }
}