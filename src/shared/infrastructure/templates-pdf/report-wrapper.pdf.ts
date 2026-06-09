import { PDFDocument, PDFPage, PDFFont, PDFImage } from 'pdf-lib';
import { PDF_THEME, loadFonts, logoBase64 } from './config';

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
  date: Date; // Recibe el objeto Date nativo
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
  const marginLeft = 40;
  const marginRight = 40;

  // --- 1. FORMATEO INTERNO ESTRICTO DE FECHA Y HORA (DD/MM/AAAA - HH:MM AM/PM) ---
  let formattedDateTime = '--/--/---- --:-- --';

  if (data.date) {
    const dateTimeFormatter = new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // 1. Obtenemos el string base (ej: "09/06/2026, 12:08 p. m." o "09/06/2026 12:08 p.m.")
    let rawStr = dateTimeFormatter.format(data.date);

    // 2. Extraemos manualmente si es PM o AM analizando la cadena de origen
    const isPM = rawStr.toLowerCase().includes('p');
    const amPmMarker = isPM ? 'PM' : 'AM';

    // 3. Limpiamos la fecha removiendo comas y cualquier rastro del marcador antiguo de Intl
    // Separamos por espacios, tomamos la fecha y la hora, y le concatenamos nuestro marcador limpio
    rawStr = rawStr.replace(',', ' -');
    const parts = rawStr.trim().split(/\s+/);

    // parts[0] = Fecha (DD/MM/AAAA), parts[1] = Guión (-), parts[2] = Hora (HH:MM)
    if (parts.length >= 3) {
      formattedDateTime = `${parts[0]} ${parts[1]} ${parts[2]} ${amPmMarker}`;
    } else {
      // Fallback seguro en caso de que la estructura del locale varíe inesperadamente
      formattedDateTime = `${rawStr.replace(/\s*[a|p]\.?\s*m\.?/i, '')} ${amPmMarker}`;
    }
  }

  // --- 2. PROCESAMIENTO SEGURO DEL LOGO ---
  let embeddedLogo: PDFImage | null = null;
  let logoWidth = 0;
  let logoHeight = 0;

  const rawLogo = data.logoBase64 && data.logoBase64.trim() !== '' ? data.logoBase64 : await logoBase64();

  try {
    const cleanLogo = rawLogo.trim();

    if (cleanLogo.startsWith('data:image/jpeg') || cleanLogo.startsWith('data:image/jpg')) {
      embeddedLogo = await pdfDoc.embedJpg(cleanLogo);
    } else if (cleanLogo.startsWith('data:image/png')) {
      embeddedLogo = await pdfDoc.embedPng(cleanLogo);
    } else {
      embeddedLogo = await pdfDoc.embedPng(cleanLogo);
    }

    if (embeddedLogo) {
      const scale = 28 / embeddedLogo.height;
      logoWidth = embeddedLogo.width * scale;
      logoHeight = embeddedLogo.height * scale;
    }
  } catch (imageError) {
    console.error("⚠️ Error crítico al procesar el logo en pdf-lib, se ignorará la imagen:", imageError);
    embeddedLogo = null;
  }

  // --- 3. DIBUJAR HEADER ULTRA-COMPACTO MINIMALISTA ---
  const topRowY = pageHeight - 38;

  // A. LOGO (A la izquierda)
  if (embeddedLogo && logoWidth > 0 && logoHeight > 0) {
    page.drawImage(embeddedLogo, {
      x: marginLeft,
      y: topRowY - (logoHeight / 2) + 2,
      width: logoWidth,
      height: logoHeight,
    });
  }

  // B. FECHA/HORA Y USUARIO (Superior Derecha - En paralelo al logo)
  const metaSize = 8;
  const dateTimeDisplay = `Fecha: ${formattedDateTime}`;
  const userText = `Usuario: ${data.user || ''}`;

  const dateTimeWidth = fonts.regular.widthOfTextAtSize(dateTimeDisplay, metaSize);
  const userWidth = fonts.regular.widthOfTextAtSize(userText, metaSize);

  page.drawText(dateTimeDisplay, {
    x: pageWidth - marginRight - dateTimeWidth,
    y: topRowY + 4,
    size: metaSize,
    font: fonts.regular,
    color: colors.textDark
  });

  page.drawText(userText, {
    x: pageWidth - marginRight - userWidth,
    y: topRowY - 6,
    size: metaSize,
    font: fonts.regular,
    color: colors.textDark
  });

  // C. TÍTULO DEL REPORTE (Centrado horizontalmente y compacto)
  const titleText = (data.title || 'SIN TÍTULO').toUpperCase();
  const titleSize = 11;
  const titleWidth = fonts.bold.widthOfTextAtSize(titleText, titleSize);

  const titleX = (pageWidth - titleWidth) / 2;
  const titleY = topRowY - 24;

  page.drawText(titleText, {
    x: titleX,
    y: titleY,
    size: titleSize,
    font: fonts.bold,
    color: colors.primary
  });

  // Línea divisoria decorativa sutil
  const separatorY = titleY - 8;
  page.drawLine({
    start: { x: marginLeft, y: separatorY },
    end: { x: pageWidth - marginRight, y: separatorY },
    thickness: 0.8,
    color: colors.secondary, // Color secundario para un toque de diseño suave
  });

  // --- 4. DIBUJAR FOOTER FIJO ---
  page.drawLine({ start: { x: 40, y: 50 }, end: { x: 555, y: 50 }, thickness: 0.5, color: colors.textDark });
  //page.drawText('Reporte Automatizado - Propiedad Confidencial', { x: 40, y: 35, size: 9, font: fonts.regular, color: colors.textDark });
  page.drawText('Página 1', { x: 515, y: 35, size: 9, font: fonts.regular, color: colors.textDark });

  // --- 5. LE CEDEMOS EL CONTROL AL CLIENTE ---
  try {
    await data.renderContent({
      page,
      fonts,
      colors,
      startY: separatorY - 15
    });
  } catch (contentError) {
    console.error("❌ Error dibujando el contenido del cliente (contentReport):", contentError);
  }

  return await pdfDoc.save();
}