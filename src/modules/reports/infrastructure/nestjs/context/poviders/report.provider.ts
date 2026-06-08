import { IUserReportRepository, USER_REPORT_REPOSITORY } from "@src/modules/reports/core/user/IUserReportRepository";
import { UserListReportUseCase } from "@src/modules/reports/app/user-reports/user-list/user-list-report.use-case";
import { IUserListExportPdf, USER_LIST_EXPORT_PDF } from "@src/modules/reports/app/user-reports/user-list/user-list-export.pdf";


export const ReportsProvider = [

    // REPORTES DE USUARIOS
    {
        provide: UserListReportUseCase,
        inject: [USER_REPORT_REPOSITORY, USER_LIST_EXPORT_PDF],
        useFactory: (
            repo: IUserReportRepository, 
            pdfService: IUserListExportPdf
        ) => new UserListReportUseCase(repo, pdfService),
    }

]