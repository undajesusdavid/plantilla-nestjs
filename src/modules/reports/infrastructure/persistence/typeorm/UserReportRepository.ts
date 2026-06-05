import { IUserReportRepository } from "@src/modules/reports/core/ports/IUserReportRepository";
import { User } from "@src/modules/reports/core/user.type";
import { UserReportEntity } from "./UserReportEntity";

export class UserReportRepository implements IUserReportRepository {
  constructor(private readonly userReportEntity: UserReportEntity) {}

  getUserList(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}