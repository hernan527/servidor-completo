import fs from 'fs/promises';
import path from 'path';

const servicios: { [key: string]: any } = {};

export async function importModules() {
  try {
    const files = await fs.readdir(__dirname);
    for (const file of files) {
      if (file !== 'index.ts' && file.slice(-3) === '.ts') {
        const moduleName = path.basename(file, '.ts');
        servicios[moduleName] = await import(`./${moduleName}`);
      }
    }
  } catch (error) {
    console.error('Ha ocurrido un error:', error);
  }
}

export default servicios;
