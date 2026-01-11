"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// comando: npx ts-node importador.ts
const database_1 = require("../config/database"); // Ajustá el path a tu config
const fs_1 = __importDefault(require("fs"));
async function ejecutarUpsertDesdeArchivo() {
    console.log("⏳ Leyendo archivo datos.csv...");
    // 1. Leer el archivo CSV
    const contenido = fs_1.default.readFileSync('datos.csv', 'utf-8');
    const lineas = contenido.split('\n').filter(linea => linea.trim() !== '');
    // 2. Formatear los datos para el Upsert
    const filasParaSubir = lineas.map(linea => {
        // Dividimos por la primera coma para separar ID del resto (el JSON)
        const primeraComa = linea.indexOf(',');
        const id = linea.substring(0, primeraComa).trim();
        const respuesta = JSON.parse(linea.substring(primeraComa + 1).trim());
        return {
            id: parseInt(id),
            respuesta: respuesta
        };
    });
    console.log(`🚀 Iniciando UPSERT de ${filasParaSubir.length} filas...`);
    // 3. Ejecutar el comando mágico de UPSERT
    const { data, error } = await database_1.supabase
        .from('cotizaciones_maestras')
        .upsert(filasParaSubir, {
        onConflict: 'id',
        ignoreDuplicates: false
    });
    if (error) {
        console.error("❌ Error en el Upsert:", error.message);
    }
    else {
        console.log("✅ ¡Proceso terminado con éxito!");
        console.log("Ya podés ver los cambios en el Table Editor de Supabase.");
    }
}
ejecutarUpsertDesdeArchivo();
//# sourceMappingURL=importador.js.map