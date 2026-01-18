import * as fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer'; 
import { calcularPrecio } from './cotizacion';

export const procesarCotiSimple = async () => {
    const INPUT_PATH = path.join(process.cwd(), 'src', 'assets', 'data', 'datos_tercertramo-servidor-1-PC.csv');
    const OUTPUT_CSV = path.join(process.cwd(), 'src', 'assets', 'data', 'resultado_tercertramo-servidor-1-PC.csv');
    const LOG_FILE = path.join(process.cwd(), 'logs', 'seguimiento.log');

    if (!fs.existsSync(path.dirname(LOG_FILE))) fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

    let idActual = "";
    const originalLog = console.log;
    const originalErr = console.error;

    const logger = (msg: any, esError = false) => {
        const hora = new Date().toLocaleTimeString();
        const linea = `ID: ${idActual} | ${hora} | ${msg}\n`;
        fs.appendFileSync(LOG_FILE, linea);
        // En la terminal lo vemos simplificado para no marearnos
        esError ? originalErr(`ID: ${idActual} | ${msg}`) : originalLog(`ID: ${idActual} | ${msg}`);
    };

    console.log = (m) => logger(m);
    console.error = (m) => logger(m, true);

    const registros: any[] = [];
    const idsHechos = new Set();

    if (fs.existsSync(OUTPUT_CSV)) {
        await new Promise(r => fs.createReadStream(OUTPUT_CSV).pipe(csv()).on('data', (d: any) => idsHechos.add(d.id)).on('end', r));
    }
    await new Promise(r => fs.createReadStream(INPUT_PATH).pipe(csv()).on('data', (d) => registros.push(d)).on('end', r));

    const csvWriter = createCsvWriter({ path: OUTPUT_CSV, header: [{ id: 'id', title: 'id' }, { id: 'respuesta', title: 'respuesta' }], append: true });

    for (const fila of registros) {
        if (idsHechos.has(fila.id)) continue;
        idActual = fila.id;

        // SEPARADOR CLARO EN EL LOG PARA DEDUCIR POR QUÉ SE ALTERNAN
        originalLog(`\n--- INICIO PROCESO ID: ${idActual} ---`);

        try {
            await calcularPrecio({ 
                body: { ...fila, group: +fila.group, edad_1: +fila.edad_1, edad_2: +(fila.edad_2 || 0), numkids: +(fila.hijos || 0), tipo: String(fila.tipo || "D"), empresa_prepaga: 'todas' } 
            } as any, { 
                json: (d: any) => { fila.respuesta = JSON.stringify(d); return d; }, 
                status: function() { return this; } 
            } as any);
            
            await csvWriter.writeRecords([{ id: fila.id, respuesta: fila.respuesta }]);
            idsHechos.add(fila.id);
            originalLog(`ID: ${idActual} | RESULTADO FINAL: OK`);

        } catch (err: any) {
            await csvWriter.writeRecords([{ id: fila.id, respuesta: `ERROR: ${err.message}` }]);
            originalLog(`ID: ${idActual} | RESULTADO FINAL: FALLO CRITICO (${err.message})`);
            idsHechos.add(fila.id);
        }
        originalLog(`--- FIN PROCESO ID: ${idActual} ---\n`);
    }
    console.log = originalLog; console.error = originalErr;
};