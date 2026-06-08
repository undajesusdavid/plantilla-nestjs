import { PDFDocument, PDFPage, PDFFont } from 'pdf-lib';
import { PDF_THEME, loadFonts } from './config';

// Definimos lo que el cliente va a recibir dentro de su función de contenido
export interface RenderContext {
  page: PDFPage;
  fonts: { regular: PDFFont; bold: PDFFont };
  colors: typeof PDF_THEME.colors;
  /** Coordenada Y sugerida para empezar a dibujar sin pisar el header */
  startY: number; 
}

export interface ReportWrapperData {
  title: string;
  date: string;
  // El cliente nos pasa una función asíncrona que define el contenido
  renderContent: (context: RenderContext) => Promise<void> | void;
}

export async function ReportWrapperPdf(data: ReportWrapperData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const fonts = await loadFonts(pdfDoc);
  const { colors } = PDF_THEME;

  // 1. DIBUJAR HEADER FIJO
  page.drawRectangle({ x: 0, y: 760, width: 595.28, height: 81.89, color: colors.primary });
  page.drawText(data.title.toUpperCase(), { x: 40, y: 795, size: 18, font: fonts.bold, color: colors.textLight });
  page.drawText(`Fecha: ${data.date}`, { x: 40, y: 775, size: 10, font: fonts.regular, color: colors.secondary });

  // 2. DIBUJAR FOOTER FIJO
  page.drawLine({ start: { x: 40, y: 50 }, end: { x: 555, y: 50 }, thickness: 0.5, color: colors.textDark });
  page.drawText('Reporte Automatizado - Propiedad Confidencial', { x: 40, y: 35, size: 9, font: fonts.regular, color: colors.textDark });
  page.drawText('Página 1', { x: 515, y: 35, size: 9, font: fonts.regular, color: colors.textDark });

  // 3. LE CEDEMOS EL CONTROL AL CLIENTE
  // Le pasamos las herramientas necesarias (página, fuentes, colores y dónde empezar)
  await data.renderContent({
    page,
    fonts,
    colors,
    startY: 720 // El contenido empieza seguro debajo del header
  });

  return await pdfDoc.save();
}