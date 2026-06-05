import { User } from "../../core/user.type";

export const USER_REPORT_REPOSITORY = Symbol('IUserReportRepository');

export interface IUserReportRepository {
  getUserList(): Promise<User[]>;
}
