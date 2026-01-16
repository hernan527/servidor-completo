const fs = require('fs');
const readline = require('readline');
// CONFIGURACIÓN
const PATH_JSON = './precios_optimizados.json';
const PATH_CSV_ENTRADA = './planes.csv';
const PATH_CSV_SALIDA = './planes_actualizados.csv';
async function procesarNativo() {
    console.log("🚀 Cargando JSON...");
    const precios = JSON.parse(fs.readFileSync(PATH_JSON, 'utf8'));
    const readInterface = readline.createInterface({
        input: fs.createReadStream(PATH_CSV_ENTRADA),
        terminal: false
    });
    const writeStream = fs.createWriteStream(PATH_CSV_SALIDA);
    let esPrimeraLinea = true;
    console.log("Processing...");
    for await (const linea of readInterface) {
        if (esPrimeraLinea) {
            // Agregamos el encabezado de la nueva columna a la derecha
            writeStream.write(`${linea},info_precio\n`);
            esPrimeraLinea = false;
            continue;
        }
        // Dividimos por coma (asumiendo formato estándar)
        const columnas = linea.split(',');
        const id = columnas[0].trim(); // Asumimos que el ID es la primera columna
        let infoParaAgregar = "NO ENCONTRADO";
        // Buscamos en el JSON
        if (precios[id]) {
            // Extraemos solo el precio 'p' o todo el objeto
            const data = precios[id];
            infoParaAgregar = typeof data === 'object' ? data.p || JSON.stringify(data) : data;
        }
        // Escribimos la línea original + la celda de la derecha
        writeStream.write(`${linea},${infoParaAgregar}\n`);
    }
    console.log(`✅ Terminado. Archivo: ${PATH_CSV_SALIDA}`);
}
procesarNativo();
//# sourceMappingURL=unificar.js.map