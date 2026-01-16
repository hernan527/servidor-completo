"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.procesarCotiSimple = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
// Importamos la función y le ponemos el alias 'createCsvWriter' para no cambiar nada abajo
const csv_writer_1 = require("csv-writer");
const cotizacion_1 = require("./cotizacion");
const procesarCotiSimple = async () => {
    const INPUT_PATH = path_1.default.join(process.cwd(), 'src', 'assets', 'data', 'datos.csv');
    const OUTPUT_CSV = path_1.default.join(process.cwd(), 'src', 'assets', 'data', 'respuestas_temp.csv');
    const registros = [];
    // Ahora esta línea funciona perfecto y es igual a la que tenías
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: OUTPUT_CSV,
        header: [
            { id: 'id', title: 'id' },
            { id: 'respuesta', title: 'respuesta' }
        ],
        append: false
    });
    console.log("🚀 Iniciando proceso...");
    fs.createReadStream(INPUT_PATH)
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => registros.push(data))
        .on('error', (err) => console.error("❌ Error leyendo CSV:", err))
        .on('end', async () => {
        console.log(`✅ CSV cargado. Procesando ${registros.length} filas.`);
        for (let i = 0; i < registros.length; i++) {
            const fila = registros[i];
            const mockRes = {
                json: (data) => {
                    fila.respuesta = JSON.stringify(data);
                    return data;
                },
                status: function () { return this; }
            };
            try {
                await (0, cotizacion_1.calcularPrecio)({
                    body: {
                        group: Number(fila.group),
                        edad_1: Number(fila.edad_1),
                        edad_2: Number(fila.edad_2 || 0),
                        numkids: Number(fila.hijos || 0),
                        tipo: String(fila.tipo || "D"),
                        empresa_prepaga: 'todas'
                    }
                }, mockRes);
                await csvWriter.writeRecords([{
                        id: fila.id,
                        respuesta: fila.respuesta
                    }]);
                console.log(`[${i + 1}/${registros.length}] ✅ ID ${fila.id} OK`);
            }
            catch (err) {
                console.error(`❌ Error en ID ${fila.id}: ${err.message}`);
            }
        }
        console.log("🏁 Proceso terminado.");
    });
};
exports.procesarCotiSimple = procesarCotiSimple;
//# sourceMappingURL=generarCotizaciones.js.map