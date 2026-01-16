const fs = require('fs');
// CONFIGURACIÓN
const PATH_ORIGINAL = './cotizaciones_finales.json'; // El array de objetos
const PATH_CSV_A_COMPLETAR = './planes.csv';
const PATH_SALIDA = './planes_unificados_final.csv';
function procesarOriginalArray() {
    console.log("📂 Cargando y mapeando archivo original...");
    // 1. Leer el JSON original (Array)
    const rawData = JSON.parse(fs.readFileSync(PATH_ORIGINAL, 'utf8'));
    // 2. Convertir el Array en un Mapa para búsqueda rápida (O(1))
    // Usamos el ID como llave y guardamos el contenido de 'respuesta'
    const mapaOriginal = new Map();
    rawData.forEach(item => {
        if (item.id) {
            // Normalizamos el ID del JSON por si acaso
            const idNorm = String(item.id).replace(/\D/g, "").padStart(7, '0');
            mapaOriginal.set(idNorm, item.respuesta);
        }
    });
    console.log(`✅ Mapa creado con ${mapaOriginal.size} identificadores.`);
    // 3. Leer el CSV a completar
    const lineasCSV = fs.readFileSync(PATH_CSV_A_COMPLETAR, 'utf8').split(/\r?\n/);
    const resultados = [];
    let match = 0;
    let fail = 0;
    console.log("⚙️  Cruzando datos con el CSV...");
    lineasCSV.forEach((linea, i) => {
        if (!linea.trim())
            return;
        if (i === 0) {
            resultados.push(`${linea},contenido_respuesta`);
            return;
        }
        // Detectar separador (coma o punto y coma)
        let columnas = linea.split(linea.includes(';') ? ';' : ',');
        // NORMALIZACIÓN: Forzamos el ID del CSV a 7 dígitos
        let idBuscado = columnas[0].replace(/["']/g, "").replace(/\D/g, "").padStart(7, '0');
        if (mapaOriginal.has(idBuscado)) {
            let respuesta = mapaOriginal.get(idBuscado);
            // Si 'respuesta' es un objeto/array, lo pasamos a texto
            let celdaNueva = (typeof respuesta === 'object')
                ? JSON.stringify(respuesta).replace(/,/g, '|')
                : String(respuesta).replace(/,/g, '|').replace(/\n/g, ' ');
            resultados.push(`${linea},"${celdaNueva}"`);
            match++;
        }
        else {
            resultados.push(`${linea},NOT_FOUND`);
            fail++;
        }
    });
    // 4. Guardar resultado
    fs.writeFileSync(PATH_SALIDA, resultados.join('\n'), 'utf8');
    console.log("\n--- REPORTE FINAL ---");
    console.log(`✅ Coincidencias: ${match}`);
    console.log(`❌ No encontrados: ${fail}`);
    console.log(`💾 Guardado en: ${PATH_SALIDA}`);
}
procesarOriginalArray();
//# sourceMappingURL=procesar_original_array.js.map