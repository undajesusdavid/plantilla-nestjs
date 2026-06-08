import { PDFDocument } from 'pdf-lib';
import { PDF_THEME, loadFonts } from './config';

// Definimos la estructura de datos que requiere este reporte
export interface ReportData {
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
}

export async function generateReportPdf(data: ReportData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // Tamaño A4 Estándar
  const fonts = await loadFonts(pdfDoc);
  const { colors } = PDF_THEME;

  // --- CONFIGURACIÓN DE MÁRGENES Y COORDENADAS ---
  const marginX = 50;
  let currentY = 760; // Punto de partida vertical (de arriba hacia abajo)

  // 1. ENCABEZADO ESTÉTICO
  // Barra superior decorativa
  page.drawRectangle({
    x: 0,
    y: 826.89,
    width: 595.28,
    height: 15,
    color: colors.primary,
  });

  // 2. METADATOS DEL REPORTE (Alineado a la derecha)
  page.drawText(`Fecha: ${data.date}`, { x: 420, y: currentY, size: 10, font: fonts.regular, color: colors.textDark });
  page.drawText(`Preparado por: ${data.author}`, { x: 420, y: currentY - 15, size: 10, font: fonts.regular, color: colors.textDark });

  // 3. TÍTULOS PRINCIPALES
  currentY -= 40;
  page.drawText(data.title.toUpperCase(), {
    x: marginX,
    y: currentY,
    size: 24,
    font: fonts.bold,
    color: colors.primary,
  });

  if (data.subtitle) {
    currentY -= 20;
    page.drawText(data.subtitle, {
      x: marginX,
      y: currentY,
      size: 14,
      font: fonts.regular,
      color: colors.secondary,
    });
  }

  // Línea divisoria gris debajo del título
  currentY -= 20;
  page.drawLine({
    start: { x: marginX, y: currentY },
    end: { x: 545, y: currentY },
    thickness: 1,
    color: colors.secondary,
  });

  currentY -= 40;

  // 4. RENDERIZADO DINÁMICO DE SECCIONES
  for (const section of data.sections) {
    // Si nos estamos quedando sin espacio en la página, se podría implementar un salto de página.
    // Para este template inicial asumimos que cabe en una página A4.

    // Subtítulo de la sección
    page.drawText(section.heading, {
      x: marginX,
      y: currentY,
      size: 14,
      font: fonts.bold,
      color: colors.primary,
    });

    currentY -= 18;

    // Párrafos de la sección
    for (const paragraph of section.paragraphs) {
      page.drawText(paragraph, {
        x: marginX,
        y: currentY,
        size: 10.5,
        font: fonts.regular,
        color: colors.textDark,
        lineHeight: 15, // Espaciado entre líneas del mismo párrafo
      });

      // Estimación burda del espacio ocupado por el texto (aproximadamente 15 unidades por línea)
      // Nota: pdf-lib no auto-ajusta texto largo, este template asume líneas cortas o párrafos controlados.
      currentY -= 35;
    }

    currentY -= 15; // Espacio entre secciones
  }

  // 5. PIE DE PÁGINA FIXO
  page.drawLine({ start: { x: marginX, y: 50 }, end: { x: 545, y: 50 }, thickness: 0.5, color: colors.textDark });
  page.drawText('Documento Confidencial - Uso Interno', {
    x: marginX,
    y: 35,
    size: 9,
    font: fonts.regular,
    color: colors.textDark,
  });
  page.drawText('Página 1 de 1', {
    x: 490,
    y: 35,
    size: 9,
    font: fonts.regular,
    color: colors.textDark,
  });

  return await pdfDoc.save();
}