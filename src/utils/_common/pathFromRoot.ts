import fs from 'node:fs';
import path from 'node:path';

// Variable en memoria para no repetir la búsqueda en el disco
let raizProyectoCache: string | null = null;

export function pathFromRoot(...segmentos: string[]): string {
  // 1. Si no se ha calculado la raíz, la buscamos subiendo por el árbol
  if (!raizProyectoCache) {
    let carpetaActual = __dirname; // Seguro para CommonJS (NestJS/Node)

    while (carpetaActual !== path.parse(carpetaActual).root) {
      const rutaPackageJson = path.join(carpetaActual, 'package.json');
      
      if (fs.existsSync(rutaPackageJson)) {
        raizProyectoCache = carpetaActual;
        break;
      }
      
      carpetaActual = path.dirname(carpetaActual);
    }

    // Plan de respaldo si no encuentra package.json
    if (!raizProyectoCache) {
      raizProyectoCache = process.cwd();
    }
  }

  // 2. Si no se pasaron parámetros, retornamos solo la raíz
  if (segmentos.length === 0) {
    return raizProyectoCache;
  }

  // 3. Si se pasaron parámetros, hacemos el join inteligente automáticamente
  return path.join(raizProyectoCache, ...segmentos);
}