import { USER_REPORT_REPOSITORY } from "@src/modules/reports/core/user/IUserReportRepository";
import { UserReportRepository} from "../../../persistence/user-report/UserReportRepository";

export const ReportPersistenceProvider = [
    {
        provide: USER_REPORT_REPOSITORY,
        useClass: UserReportRepository,
    }
]
