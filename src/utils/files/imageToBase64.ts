import fs from 'node:fs/promises';

export async function imagenToBase64(rutaArchivo: string, formato: string = 'png'): Promise<string> {
  try {
    const base64 = await fs.readFile(rutaArchivo, { encoding: 'base64' });
    return `data:image/${formato};base64,${base64}`;
  } catch (error) {
    console.error(`Error al procesar el archivo en la ruta "${rutaArchivo}":`, error);
    throw error;
  }
}