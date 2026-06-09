import { ReportUseCase } from "@src/shared/app/reports/report.use-case";
import { IUserReportRepository } from "@src/modules/reports/core/user/IUserReportRepository";
import { UserListReportQuery } from "./user-list-report.query";
import { IUserListExportPdf } from "./user-list-export.pdf";
import { Readable } from "stream";

export class UserListReportUseCase extends ReportUseCase<UserListReportQuery, Readable> {

  static readonly HANDLED_QUERY = UserListReportQuery;

  constructor(
    private readonly repo: IUserReportRepository,
    private readonly pdf: IUserListExportPdf,
  ) {
    super();
  }

  protected async internalExecute(query:UserListReportQuery ): Promise<Readable> {
    const users = await this.repo.getUserList();
    
    return this.pdf.export({
      name: 'listado de usuarios',
      generatedAt: new Date(),
      currentUser: 'Admin',
      users,
    });
  }
}