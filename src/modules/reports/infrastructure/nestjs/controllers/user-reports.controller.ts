import { Controller, Get, StreamableFile, Header } from '@nestjs/common';
import { UserListReportQuery } from '@src/modules/reports/app/user-reports/user-list/user-list-report.query';
import { NestBaseController } from '@src/shared/infrastructure/framework/nest/controller/nest-base-controller';
import { Readable } from 'stream';

@Controller('user-reports')
export class UserReportsController extends NestBaseController {
    constructor() {
        super();
    }

    @Get('user-list')
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'inline; filename="lista_de_usuarios.pdf"')
    async UserListReport(): Promise<StreamableFile> {
        const pdfStream = await this.queryBus.execute(new UserListReportQuery()) as Readable;
        return new StreamableFile(pdfStream);
    }
}