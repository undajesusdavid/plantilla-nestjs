import { IUserReportRepository, USER_REPORT_REPOSITORY } from "@src/modules/reports/core/ports/IUserReportRepository";
import { UserListReport } from "@src/modules/reports/app/user-reports/user-list.report";


export const ReportsProvider = [

    // REPORTES DE USUARIOS
    {
        provide: UserListReport,
        inject: [USER_REPORT_REPOSITORY],
        useFactory: (repo: IUserReportRepository) => new UserListReport(repo),
    }

]