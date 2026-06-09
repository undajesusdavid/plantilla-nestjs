import { IUserListExportPdf } from "@src/modules/reports/app/user-reports/user-list/user-list-export.pdf";
import { UserListDataType } from "@src/modules/reports/app/user-reports/user-list/user-list-data.type";
import { Readable } from "stream";
import { ReportWrapperPdf, RenderContext } from "@src/shared/infrastructure/templates-pdf/report-wrapper.pdf";

export class UserListExportPdf implements IUserListExportPdf {

    async export(data: UserListDataType): Promise<Readable> {
        const pdfBytes = await ReportWrapperPdf({
            title: data.name,
            date: data.generatedAt,
            user: data.currentUser,
            logoBase64: data.logo,
            renderContent: (context) => this.contentReport(context, data)
        });

        const stream = new Readable();
        stream.push(pdfBytes);
        stream.push(null);

        return stream;
    }

    contentReport = async (context: RenderContext, data: UserListDataType): Promise<void> => {
        const { page, fonts, colors, startY } = context;

        // --- Configuración de Dimensiones de la Tabla Cerrada ---
        const tableX = 50;           // Margen izquierdo de la tabla
        const rowHeight = 20;        // Alto de cada fila (cabecera y datos)
        const paddingTextX = 8;      // Padding interno izquierdo para el texto de las celdas
        const paddingTextY = 6;      // Ajuste vertical para centrar el texto en la celda

        // Anchos fijos de cada columna
        const colWidths = {
            username: 130,
            email: 240,
            status: 125
        };

        // Posiciones X de inicio absolutas para cada columna
        const colX = {
            username: tableX,
            email: tableX + colWidths.username,
            status: tableX + colWidths.username + colWidths.email
        };

        // Ancho total de la tabla (495px)
        const tableWidth = colWidths.username + colWidths.email + colWidths.status;

        // La tabla inicia directamente en el startY del contenedor (sin subtítulo)
        let currentY = startY;

        // ==========================================
        // 1. RENDERIZADO DE LA CABECERA (ENCABEZADOS)
        // ==========================================

        // Fondo sólido para la cabecera
        page.drawRectangle({
            x: tableX,
            y: currentY - rowHeight,
            width: tableWidth,
            height: rowHeight,
            color: colors.primary,
        });

        // Textos de la cabecera
        page.drawText('USUARIO', {
            x: colX.username + paddingTextX,
            y: currentY - rowHeight + paddingTextY,
            size: 8.5,
            font: fonts.bold,
            color: colors.textLight
        });
        page.drawText('CORREO ELECTRÓNICO', {
            x: colX.email + paddingTextX,
            y: currentY - rowHeight + paddingTextY,
            size: 8.5,
            font: fonts.bold,
            color: colors.textLight
        });
        page.drawText('ESTADO', {
            x: colX.status + paddingTextX,
            y: currentY - rowHeight + paddingTextY,
            size: 8.5,
            font: fonts.bold,
            color: colors.textLight
        });

        // Bordes verticales de la cabecera
        page.drawLine({ start: { x: colX.username, y: currentY }, end: { x: colX.username, y: currentY - rowHeight }, thickness: 1, color: colors.primary });
        page.drawLine({ start: { x: colX.email, y: currentY }, end: { x: colX.email, y: currentY - rowHeight }, thickness: 0.8, color: colors.textLight });
        page.drawLine({ start: { x: colX.status, y: currentY }, end: { x: colX.status, y: currentY - rowHeight }, thickness: 0.8, color: colors.textLight });
        page.drawLine({ start: { x: tableX + tableWidth, y: currentY }, end: { x: tableX + tableWidth, y: currentY - rowHeight }, thickness: 1, color: colors.primary });

        currentY -= rowHeight;

        // ==========================================
        // 2. RENDERIZADO DE FILAS (DATOS)
        // ==========================================
        for (const user of data.users) {
            // Control de desbordamiento de página (Límite seguro antes del footer en Y: 50)
            if (currentY - rowHeight < 70) {
                break;
            }

            // Dibujamos el texto de las celdas
            page.drawText(user.username || 'N/A', {
                x: colX.username + paddingTextX,
                y: currentY - rowHeight + paddingTextY,
                size: 8.5,
                font: fonts.regular,
                color: colors.textDark
            });

            page.drawText(user.email || 'N/A', {
                x: colX.email + paddingTextX,
                y: currentY - rowHeight + paddingTextY,
                size: 8.5,
                font: fonts.regular,
                color: colors.textDark
            });

            const statusText = user.active ? 'Activo' : 'Inactivo';
            page.drawText(statusText, {
                x: colX.status + paddingTextX,
                y: currentY - rowHeight + paddingTextY,
                size: 8,
                font: fonts.bold,
                color: colors.textDark
            });

            // --- Dibujo de la Cuadrícula Cerrada para esta Fila ---
            // Línea horizontal inferior de la celda
            page.drawLine({
                start: { x: tableX, y: currentY - rowHeight },
                end: { x: tableX + tableWidth, y: currentY - rowHeight },
                thickness: 0.6,
                color: colors.primary
            });

            // Líneas verticales divisorias y bordes exteriores
            page.drawLine({ start: { x: colX.username, y: currentY }, end: { x: colX.username, y: currentY - rowHeight }, thickness: 1, color: colors.primary });
            page.drawLine({ start: { x: colX.email, y: currentY }, end: { x: colX.email, y: currentY - rowHeight }, thickness: 0.6, color: colors.primary });
            page.drawLine({ start: { x: colX.status, y: currentY }, end: { x: colX.status, y: currentY - rowHeight }, thickness: 0.6, color: colors.primary });
            page.drawLine({ start: { x: tableX + tableWidth, y: currentY }, end: { x: tableX + tableWidth, y: currentY - rowHeight }, thickness: 1, color: colors.primary });

            currentY -= rowHeight;
        }
    }
}