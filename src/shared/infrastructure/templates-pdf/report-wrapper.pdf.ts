import { PDFDocument, PDFPage, PDFFont, PDFImage } from 'pdf-lib';
import { PDF_THEME, loadFonts, logoBase64 } from './config';


// Definimos lo que el cliente va a recibir dentro de su función de contenido
export interface RenderContext {
  page: PDFPage;
  fonts: { regular: PDFFont; bold: PDFFont };
  colors: typeof PDF_THEME.colors;
  /** Coordenada Y sugerida para empezar a dibujar sin pisar el header (Optimizado para diseño compacto) */
  startY: number;
}

export interface ReportWrapperData {
  title: string;
  date: string;
  user: string;
  logoBase64?: string; // Opcional: Base64 de la imagen del logo (PNG o JPEG)
  // El cliente nos pasa una función asíncrona que define el contenido
  renderContent: (context: RenderContext) => Promise<void> | void;
}

export async function ReportWrapperPdf(data: ReportWrapperData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const fonts = await loadFonts(pdfDoc);
  const { colors } = PDF_THEME;

  const pageWidth = 595.28;
  const pageHeight = 841.89;

  // --- 1. PROCESAMIENTO SEGURO DEL LOGO ---
  let embeddedLogo: PDFImage | null = null; // Tipado explícito corregido
  let logoWidth = 0;
  let logoHeight = 0;

  // Consumimos el logo del usuario o usamos el de respaldo por defecto
  const rawLogo = data.logoBase64 && data.logoBase64.trim() !== '' ? data.logoBase64 : await logoBase64();

  try {
    const cleanLogo = rawLogo.trim();

    if (cleanLogo.startsWith('data:image/jpeg') || cleanLogo.startsWith('data:image/jpg')) {
      embeddedLogo = await pdfDoc.embedJpg(cleanLogo);
    } else if (cleanLogo.startsWith('data:image/png')) {
      embeddedLogo = await pdfDoc.embedPng(cleanLogo);
    } else {
      // Si no trae el prefijo data:image, intentamos cargarlo como PNG directo
      embeddedLogo = await pdfDoc.embedPng(cleanLogo);
    }

    if (embeddedLogo) {
      // Escalamos el logo para que se ajuste al header compacto (alto máximo de 35px)
      const scale = 35 / embeddedLogo.height;
      logoWidth = embeddedLogo.width * scale;
      logoHeight = embeddedLogo.height * scale;
    }
  } catch (imageError) {
    // Si la imagen está corrupta o mal formateada, no rompe la generación del PDF completo
    console.error("⚠️ Error crítico al procesar el logo en pdf-lib, se ignorará la imagen:", imageError);
    embeddedLogo = null;
  }

  // --- 2. DIBUJAR HEADER COMPACTO Y FIJO ---
  // Reducimos el alto del header a 60 unidades para maximizar el espacio útil
  const headerHeight = 60;
  const headerY = pageHeight - headerHeight; // 781.89

  page.drawRectangle({
    x: 0,
    y: headerY,
    width: pageWidth,
    height: headerHeight,
    color: colors.primary
  });

  // A. LOGO (A la izquierda)
  const marginLeft = 40;
  if (embeddedLogo && logoWidth > 0 && logoHeight > 0) {
    page.drawImage(embeddedLogo, {
      x: marginLeft,
      y: headerY + (headerHeight - logoHeight) / 2, // Centrado vertical exacto en el header
      width: logoWidth,
      height: logoHeight,
    });
  }

  // B. TÍTULO DEL REPORTE (Centrado horizontalmente)
  const titleText = (data.title || 'SIN TÍTULO').toUpperCase();
  const titleSize = 14;
  const titleWidth = fonts.bold.widthOfTextAtSize(titleText, titleSize);
  const titleX = (pageWidth - titleWidth) / 2;

  page.drawText(titleText, {
    x: titleX,
    y: headerY + (headerHeight / 2) - (titleSize / 4), // Centrado vertical estimado
    size: titleSize,
    font: fonts.bold,
    color: colors.textLight
  });

  // C. FECHA Y USUARIO (Superior Derecha - Letra Pequeña)
  const marginRight = 40;
  const metaSize = 8; // Tamaño de letra pequeño
  const dateText = `Fecha: ${data.date || ''}`;
  const userText = `Usuario: ${data.user || ''}`;

  const dateWidth = fonts.regular.widthOfTextAtSize(dateText, metaSize);
  const userWidth = fonts.regular.widthOfTextAtSize(userText, metaSize);

  // Alinear a la derecha restando el ancho del texto al margen derecho de la hoja
  page.drawText(dateText, {
    x: pageWidth - marginRight - dateWidth,
    y: headerY + 34,
    size: metaSize,
    font: fonts.regular,
    color: colors.textLight
  });

  page.drawText(userText, {
    x: pageWidth - marginRight - userWidth,
    y: headerY + 18,
    size: metaSize,
    font: fonts.regular,
    color: colors.textLight
  });

  // --- 3. DIBUJAR FOOTER FIJO ---
  page.drawLine({ start: { x: 40, y: 50 }, end: { x: 555, y: 50 }, thickness: 0.5, color: colors.textDark });
  page.drawText('Reporte Automatizado - Propiedad Confidencial', { x: 40, y: 35, size: 9, font: fonts.regular, color: colors.textDark });
  page.drawText('Página 1', { x: 515, y: 35, size: 9, font: fonts.regular, color: colors.textDark });

  // --- 4. LE CEDEMOS EL CONTROL AL CLIENTE CONTROLANDO EXCEPCIONES ---
  try {
    await data.renderContent({
      page,
      fonts,
      colors,
      startY: headerY - 26 // El contenido empieza seguro en ~755 (ganando 35px de espacio vertical)
    });
  } catch (contentError) {
    console.error("❌ Error dibujando el contenido del cliente (contentReport):", contentError);
  }

  return await pdfDoc.save();
}