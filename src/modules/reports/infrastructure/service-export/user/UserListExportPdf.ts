import { IUserListExportPdf } from "@src/modules/reports/app/user-reports/user-list/user-list-export.pdf";
import { UserListDataType } from "@src/modules/reports/app/user-reports/user-list/user-list-data.type";
import { Readable } from "stream";
import { ReportWrapperPdf, RenderContext } from "@src/shared/infrastructure/templates-pdf/report-wrapper.pdf";

export class UserListExportPdf implements IUserListExportPdf {


    async export(data: UserListDataType): Promise<Readable> {

        const pdfBytes = await ReportWrapperPdf({
            title: data.name,
            date: data.generatedAt.toLocaleDateString(),
            user: data.currentUser,
            logoBase64: data.logo,
            renderContent: (context) => this.contentReport(context)
        });

        const stream = new Readable();
        stream.push(pdfBytes);
        stream.push(null);

        return stream;
    }

    contentReport = async (context: RenderContext): Promise<void> => {
        const { page, fonts, colors, startY } = context;
        const { width } = page.getSize();

        // Subtítulo de la sección actual
        page.drawText('Listado de Usuarios Registrados', {
            x: 10,
            y: startY,
            size: 11,
            font: fonts.regular,
            color: colors.primary
        });
        const currentY = startY - 22;

        // --- TABLA (ENCABEZADOS) ---
        const colWidths = [80, 180, 250]; // Distribución de ancho optimizada para pantallas estándar
        page.drawText('Usuario', { x: 50 + colWidths[0], y: currentY, size: 10, font: fonts.bold, color: colors.primary });
        page.drawText('Correo Electrónico', { x: 50 + colWidths[0] + colWidths[1], y: currentY, size: 10, font: fonts.bold, color: colors.primary });
        const lineY = currentY - 6;
        page.drawLine({
            start: { x: 50, y: lineY },
            end: { x: width - 50, y: lineY },
            thickness: 1.2,
            color: colors.primary, // Línea de encabezado de tabla más firme
        });


    }
}