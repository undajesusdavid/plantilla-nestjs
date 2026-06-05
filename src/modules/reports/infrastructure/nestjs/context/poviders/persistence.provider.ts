import { USER_REPORT_REPOSITORY } from "@src/modules/reports/core/ports/IUserReportRepository";
import { UserReportRepository} from "../../../persistence/typeorm/UserReportRepository";


export const ReportPersistenceProvider = [
    {
        provide: USER_REPORT_REPOSITORY,
        useClass: UserReportRepository,
    }
]
