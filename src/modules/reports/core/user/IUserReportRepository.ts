import { UserReport } from "./user-report.type";

export const USER_REPORT_REPOSITORY = Symbol('IUserReportRepository');

export interface IUserReportRepository {
  getUserList(): Promise<UserReport[]>;
}
