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
const csv_writer_1 = require("csv-writer");
const cotizacion_1 = require("./cotizacion");
const procesarCotiSimple = async () => {
    const INPUT_PATH = path_1.default.join(process.cwd(), 'src', 'assets', 'data', 'datos_tercertramo-servidor-1-PC.csv');
    const OUTPUT_CSV = path_1.default.join(process.cwd(), 'src', 'assets', 'data', 'resultado_tercertramo-servidor-1-PC.csv');
    const LOG_FILE = path_1.default.join(process.cwd(), 'logs', 'seguimiento.log');
    if (!fs.existsSync(path_1.default.dirname(LOG_FILE)))
        fs.mkdirSync(path_1.default.dirname(LOG_FILE), { recursive: true });
    let idActual = "";
    const originalLog = console.log;
    const originalErr = console.error;
    const logger = (msg, esError = false) => {
        const hora = new Date().toLocaleTimeString();
        const linea = `ID: ${idActual} | ${hora} | ${msg}\n`;
        fs.appendFileSync(LOG_FILE, linea);
        // En la terminal lo vemos simplificado para no marearnos
        esError ? originalErr(`ID: ${idActual} | ${msg}`) : originalLog(`ID: ${idActual} | ${msg}`);
    };
    console.log = (m) => logger(m);
    console.error = (m) => logger(m, true);
    const registros = [];
    const idsHechos = new Set();
    if (fs.existsSync(OUTPUT_CSV)) {
        await new Promise(r => fs.createReadStream(OUTPUT_CSV).pipe((0, csv_parser_1.default)()).on('data', (d) => idsHechos.add(d.id)).on('end', r));
    }
    await new Promise(r => fs.createReadStream(INPUT_PATH).pipe((0, csv_parser_1.default)()).on('data', (d) => registros.push(d)).on('end', r));
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({ path: OUTPUT_CSV, header: [{ id: 'id', title: 'id' }, { id: 'respuesta', title: 'respuesta' }], append: true });
    for (const fila of registros) {
        if (idsHechos.has(fila.id))
            continue;
        idActual = fila.id;
        // SEPARADOR CLARO EN EL LOG PARA DEDUCIR POR QUÉ SE ALTERNAN
        originalLog(`\n--- INICIO PROCESO ID: ${idActual} ---`);
        try {
            await (0, cotizacion_1.calcularPrecio)({
                body: { ...fila, group: +fila.group, edad_1: +fila.edad_1, edad_2: +(fila.edad_2 || 0), numkids: +(fila.hijos || 0), tipo: String(fila.tipo || "D"), empresa_prepaga: 'todas' }
            }, {
                json: (d) => { fila.respuesta = JSON.stringify(d); return d; },
                status: function () { return this; }
            });
            await csvWriter.writeRecords([{ id: fila.id, respuesta: fila.respuesta }]);
            idsHechos.add(fila.id);
            originalLog(`ID: ${idActual} | RESULTADO FINAL: OK`);
        }
        catch (err) {
            await csvWriter.writeRecords([{ id: fila.id, respuesta: `ERROR: ${err.message}` }]);
            originalLog(`ID: ${idActual} | RESULTADO FINAL: FALLO CRITICO (${err.message})`);
            idsHechos.add(fila.id);
        }
        originalLog(`--- FIN PROCESO ID: ${idActual} ---\n`);
    }
    console.log = originalLog;
    console.error = originalErr;
};
exports.procesarCotiSimple = procesarCotiSimple;
//# sourceMappingURL=generarCotizaciones.js.map