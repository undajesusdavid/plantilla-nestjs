import { UserReport } from "@src/modules/reports/core/user/user-report.type";
import { ReportDataType } from "@src/shared/app/reports/report-data.type";

export interface UserListDataType extends ReportDataType {
    users: UserReport[]
}