// modelsLoader.ts
import fs from 'fs/promises';
import path from 'path';
import { Model } from 'mongoose';

async function loadModels() {
  const models: { nombre: string; modelo: Model<any> }[] = [];

  try {
    const files = await fs.readdir(__dirname);
    for (const file of files) {
      if (file !== 'index.ts' && file.slice(-3) === '.ts') {
        const modelName = path.basename(file, '.ts');
        const model = require(`./${modelName}`).default; // Asume que exportas el modelo por defecto
        models.push({ nombre: modelName, modelo: model });
      }


    }
  } catch (error) {
    console.error('Ha ocurrido un error:', error);
  }

  return models; // Devuelve el array de objetos con nombre y modelo
}

const models = loadModels()

export default models