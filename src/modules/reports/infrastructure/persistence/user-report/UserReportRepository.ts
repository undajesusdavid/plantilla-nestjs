import { IUserReportRepository } from "@src/modules/reports/core/user/IUserReportRepository";
import { UserReport } from "@src/modules/reports/core/user/user-report.type";
import { UserReportEntity } from "./UserReportEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class UserReportRepository implements IUserReportRepository {
  constructor(
    @InjectRepository(UserReportEntity)
    private readonly repo: Repository<UserReportEntity>
  ) {}

  async getUserList(): Promise<UserReport[]> {
    const users = await this.repo.find();
    return users.map((entity) => ({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      active: entity.active,
    }));
  }
}