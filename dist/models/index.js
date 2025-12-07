"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// modelsLoader.ts
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function loadModels() {
    const models = [];
    try {
        const files = await promises_1.default.readdir(__dirname);
        for (const file of files) {
            if (file !== 'index.ts' && file.slice(-3) === '.ts') {
                const modelName = path_1.default.basename(file, '.ts');
                const model = require(`./${modelName}`).default; // Asume que exportas el modelo por defecto
                models.push({ nombre: modelName, modelo: model });
            }
        }
    }
    catch (error) {
        console.error('Ha ocurrido un error:', error);
    }
    return models; // Devuelve el array de objetos con nombre y modelo
}
const models = loadModels();
exports.default = models;
//# sourceMappingURL=index.js.map