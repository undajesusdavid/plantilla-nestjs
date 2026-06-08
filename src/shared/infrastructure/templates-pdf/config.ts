// src/pdf-templates/config.ts
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// Paleta de colores reutilizable
export const PDF_THEME = {
    colors: {
        primary: rgb(0.08, 0.18, 0.36),   // Azul Ejecutivo
        secondary: rgb(0.2, 0.6, 0.8),    // Azul Claro
        textDark: rgb(0.15, 0.15, 0.15),  // Gris oscuro
        textLight: rgb(0.95, 0.95, 0.95), // Blanco
        accent: rgb(0.85, 0.3, 0.2)       // Naranja/Rojo
    }
};

// Helper para cargar fuentes estándar de forma rápida
export async function loadFonts(pdfDoc: PDFDocument) {
    return {
        regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
        bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    };
}