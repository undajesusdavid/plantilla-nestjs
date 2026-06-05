import { ReportUseCase } from "@src/shared/app/use-cases/report.use-case";
import { IUserReportRepository } from "../../core/ports/IUserReportRepository";
import { UserListReportCommand } from "./user-list.command";

export class UserListReport extends ReportUseCase<UserListReportCommand, void> {

  static readonly HANDLED_COMMAND = UserListReportCommand;

  constructor(private readonly repo: IUserReportRepository) {
    super();
  }

  protected async internalExecute(input: UserListReportCommand): Promise<void> {
    const users = await this.repo.getUserList();
    return Promise.resolve();
  }
}