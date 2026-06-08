import { IUserListExportPdf } from "@src/modules/reports/app/user-reports/user-list/user-list-export.pdf";
import { UserListDataType } from "@src/modules/reports/app/user-reports/user-list/user-list-data.type";
import { Readable } from "stream";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export class UserListExportPdf implements IUserListExportPdf {

    async export(data: UserListDataType): Promise<Readable> {
        const pdfDoc = await PDFDocument.create();

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

        const page = pdfDoc.addPage([612, 792]);
        const { width, height } = page.getSize();

        // Paleta de colores minimalista y elegante
        const primaryColor = rgb(0.1, 0.15, 0.28); // Azul oscuro / Slate
        const mutedTextColor = rgb(0.4, 0.45, 0.5); // Gris corporativo para metadata
        const lineSeparatorColor = rgb(0.8, 0.82, 0.85); // Gris claro

        // --- ENCABEZADO COMPACTO Y ELEGANTE ---
        let currentY = height - 45; // Margen superior optimizado
        const startX = 50;
        const rightColumnX = width - 200; // Alineación para la metadata a la derecha

        // Columna Izquierda: Título Principal del Reporte
        page.drawText(data.name.toUpperCase(), {
            x: startX,
            y: currentY,
            size: 15,
            font: helveticaBold,
            color: primaryColor
        });

        // Columna Derecha: Metadata del Reporte (Compactada en bloque sutil)
        page.drawText(`Fecha: ${data.generatedAt.toLocaleDateString()}`, {
            x: rightColumnX,
            y: currentY,
            size: 9,
            font: helveticaFont,
            color: mutedTextColor
        });

        page.drawText(`Por: ${data.currentUser}`, {
            x: rightColumnX,
            y: currentY - 12,
            size: 9,
            font: helveticaFont,
            color: mutedTextColor
        });

        // Ajuste vertical tras el bloque de dos columnas
        currentY -= 28;

        // Línea divisoria superior del reporte (Delgada y elegante)
        page.drawLine({
            start: { x: startX, y: currentY },
            end: { x: width - 50, y: currentY },
            thickness: 0.75,
            color: lineSeparatorColor,
        });

        currentY -= 20;

        // Subtítulo de la sección actual
        page.drawText('Listado de Usuarios Registrados', {
            x: startX,
            y: currentY,
            size: 11,
            font: helveticaOblique,
            color: primaryColor
        });

        currentY -= 22;

        // --- TABLA (ENCABEZADOS) ---
        const colWidths = [80, 180, 250]; // Distribución de ancho optimizada para pantallas estándar

        //page.drawText('ID', { x: startX, y: currentY, size: 10, font: helveticaBold, color: primaryColor });
        page.drawText('Usuario', { x: startX + colWidths[0], y: currentY, size: 10, font: helveticaBold, color: primaryColor });
        page.drawText('Correo Electrónico', { x: startX + colWidths[0] + colWidths[1], y: currentY, size: 10, font: helveticaBold, color: primaryColor });

        currentY -= 6;
        page.drawLine({
            start: { x: startX, y: currentY },
            end: { x: width - 50, y: currentY },
            thickness: 1.2,
            color: primaryColor, // Línea de encabezado de tabla más firme
        });

        currentY -= 16;

        // --- RENDER DINÁMICO DE USUARIOS ---
        for (const user of data.users) {
            if (currentY < 45) {
                const newPage = pdfDoc.addPage([612, 792]);
                currentY = 747;

                // Repetir encabezados de tabla de forma elegante en nueva página si aplica
                page.drawText('ID', { x: startX, y: currentY, size: 10, font: helveticaBold, color: primaryColor });
                // ... (Opcional: puedes replicar la lógica de cabecera de tabla aquí si lo requieres)
            }

            //page.drawText(String(user.id), { x: startX, y: currentY, size: 9, font: helveticaFont });
            page.drawText(user.username, { x: startX + colWidths[0], y: currentY, size: 9, font: helveticaFont });
            page.drawText(user.email, { x: startX + colWidths[0] + colWidths[1], y: currentY, size: 9, font: helveticaFont });

            currentY -= 18; // Espaciado entre filas ligeramente más compacto
        }

        const pdfBytes = await pdfDoc.save();

        const stream = new Readable();
        stream.push(pdfBytes);
        stream.push(null);

        return stream;
    }
}