import { USER_LIST_EXPORT_PDF } from "@src/modules/reports/app/user-reports/user-list/user-list-export.pdf";
import { UserListExportPdf } from "../../../service-export/user/UserListExportPdf";


export const ServiceProviders = [
    {
        provide: USER_LIST_EXPORT_PDF,
        useClass: UserListExportPdf,
    },
]