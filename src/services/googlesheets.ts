import { google } from 'googleapis';
import { Request, Response } from 'express';

// Opcional: Define una interfaz para los datos de las tarjetas si lo deseas
// type CardData = any; // O una estructura más específica

// ⚠️ Usar variables de entorno es CRUCIAL para la seguridad
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY; 
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

const Swiss_Medical = "todas!B2";
const SanCor_Salud = "todas!B3";
const Medife = "todas!B4"; 
const Omint = "todas!B5";
const Prevencion_Salud = "todas!B6";
const Avalian = "todas!B7";
const Galeno = "todas!B8";
const Premedic = "todas!B9";
const Doctored = "todas!B10";
const Salud_Central = "todas!B11";
const Cristal = "todas!B12";
const Emergencias = "todas!B13";
const RANGOS: string[] = [Swiss_Medical,SanCor_Salud,Medife,Omint,Prevencion_Salud,Avalian,Galeno,Premedic]; // Celda correcta
// Define los rangos que tu aplicación necesita (deberías pasarlos como parámetro 
// o definirlos aquí si son fijos para esta función)
const clinicaAvalian = "Avalian!B60:D360";
/**
 * Función para obtener y procesar datos de Google Sheets.
 */
const getItems = async (): Promise<any[]> => {
    if (!API_KEY || !SPREADSHEET_ID) {
        throw new Error("❌ Variables de entorno (API_KEY o SPREADSHEET_ID) no definidas.");
    }
    
    // 1. Inicializar la API de Google Sheets
    const sheets = google.sheets({
        version: 'v4',
        auth: API_KEY, // Se usa la API Key para acceso público de lectura
    });

    const allData: any[] = [];

    try {
        // 2. Usar batchGet para optimizar la llamada a múltiples rangos (opcional pero recomendado)
        // O puedes seguir usando el bucle for como en tu frontend, pero con la librería de Node.js
        
        const response = await sheets.spreadsheets.values.batchGet({
            spreadsheetId: SPREADSHEET_ID,
            ranges: RANGOS,
        });

        const valueRanges = response.data.valueRanges;

        if (!valueRanges) {
             console.warn("⚠️ No se encontraron rangos de valores.");
             return [];
        }

        // 3. Procesar los datos (similar a tu lógica de frontend)
        valueRanges.forEach((rangeResponse, index) => {
            const currentRange = RANGOS[index];
            const values = rangeResponse.values;

            if (values && values.length > 0 && values[0] && values[0].length > 0) {
                let cellData: string = values[0][0] as string;
                
                // --- TU LÓGICA DE PARSEADO EN EL SERVIDOR ---
                let parsedData: any;
                let cleanedData = cellData.trim();
                
                // Lógica de limpieza y new Function()
                if ((cleanedData.startsWith('"') && cleanedData.endsWith('"')) || 
                    (cleanedData.startsWith("'") && cleanedData.endsWith("'"))) {
                    cleanedData = cleanedData.slice(1, -1);
                }

                try {
                    // ⚠️ ADVERTENCIA: Usar new Function() en el backend es peligroso 
                    // si la hoja de cálculo puede ser modificada por un usuario malicioso. 
                    // Evalúa el riesgo y considera usar un parser JSON estándar si es posible.
                    const functionBody = `return (${cleanedData});`;
                    const parser = new Function(functionBody);
                    parsedData = parser();
                } catch (error) {
                    console.error(`❌ Falló la evaluación del código JS para el rango ${currentRange}. Valor: ${cellData}`, error);
                    return; // Saltar a la siguiente iteración
                }
                // --- FIN DE LA LÓGICA DE PARSEADO ---

                if (Array.isArray(parsedData)) {
                    allData.push(...parsedData);
                } else {
                    allData.push(parsedData);
                }

            } else {
                console.warn(`⚠️ La celda para el rango ${currentRange} está vacía o no contiene datos.`);
            }
        });

        return allData;
        
    } catch (error) {
        console.error("❌ Error en el servicio al obtener datos de Google Sheets:", error);
        // Re-lanza un error más limpio para que el controlador lo maneje
        throw new Error("Error al comunicarse con Google Sheets API."); 
    }
};

export { getItems };







