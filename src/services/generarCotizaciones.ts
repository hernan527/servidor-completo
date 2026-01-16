import * as fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
// Importamos la función y le ponemos el alias 'createCsvWriter' para no cambiar nada abajo
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer'; 
import { calcularPrecio } from './cotizacion';

export const procesarCotiSimple = async () => {
    const INPUT_PATH = path.join(process.cwd(), 'src', 'assets', 'data', 'datos.csv');
    const OUTPUT_CSV = path.join(process.cwd(), 'src', 'assets', 'data', 'respuestas_temp.csv');

    const registros: any[] = [];

    // Ahora esta línea funciona perfecto y es igual a la que tenías
    const csvWriter = createCsvWriter({
        path: OUTPUT_CSV,
        header: [
            { id: 'id', title: 'id' },
            { id: 'respuesta', title: 'respuesta' }
        ],
        append: false
    });

    console.log("🚀 Iniciando proceso...");

    fs.createReadStream(INPUT_PATH)
        .pipe(csv())
        .on('data', (data) => registros.push(data))
        .on('error', (err) => console.error("❌ Error leyendo CSV:", err))
        .on('end', async () => {
            console.log(`✅ CSV cargado. Procesando ${registros.length} filas.`);

            for (let i = 0; i < registros.length; i++) {
                const fila = registros[i];
                
                const mockRes = {
                    json: (data: any) => { 
                        fila.respuesta = JSON.stringify(data); 
                        return data; 
                    },
                    status: function() { return this; }
                };

                try {
                    await calcularPrecio({ 
                        body: {
                            group: Number(fila.group),
                            edad_1: Number(fila.edad_1),
                            edad_2: Number(fila.edad_2 || 0),
                            numkids: Number(fila.hijos || 0),
                            tipo: String(fila.tipo || "D"),
                            empresa_prepaga: 'todas'
                        } 
                    } as any, mockRes as any);
                    
                    await csvWriter.writeRecords([{ 
                        id: fila.id, 
                        respuesta: fila.respuesta 
                    }]);

                    console.log(`[${i + 1}/${registros.length}] ✅ ID ${fila.id} OK`);

                } catch (err: any) {
                    console.error(`❌ Error en ID ${fila.id}: ${err.message}`);
                }
            }
            console.log("🏁 Proceso terminado.");
        });
};