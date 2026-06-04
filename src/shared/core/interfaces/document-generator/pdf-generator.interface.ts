export const PDF_GENERATOR = Symbol('PdfGenerator');

export interface IPdfGenerator<T> {
  generatePdf(data: T): Promise<NodeJS.ReadableStream>;
}
