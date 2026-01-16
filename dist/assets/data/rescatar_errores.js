const fs = require('fs');
try {
    console.log("Leyendo archivo original para rescatar errores...");
    const rawData = fs.readFileSync('./cotizaciones_finales.json', 'utf8');
    const cotizaciones = JSON.parse(rawData);
    // Filtramos los registros que cumplen las condiciones de error
    const registrosConError = cotizaciones.filter((c) => {
        // 1. No tiene la propiedad respuesta
        const noTieneRespuesta = !c.respuesta;
        // 2. Tiene el mensaje "ERROR GET ITEMS" en la respuesta
        // (Asumiendo que viene como un string o dentro del array de respuesta)
        const tieneErrorMsg = c.respuesta &&
            typeof c.respuesta === 'string' &&
            c.respuesta.includes("ERROR GET ITEMS");
        // 3. Respuesta es un array vacío (opcional, por si quieres capturarlos también)
        const respuestaVacia = Array.isArray(c.respuesta) && c.respuesta.length === 0;
        return noTieneRespuesta || tieneErrorMsg || respuestaVacia;
    });
    const nombreArchivoErrores = './errores_cotizaciones.json';
    fs.writeFileSync(nombreArchivoErrores, JSON.stringify(registrosConError, null, 2));
    console.log("-----------------------------------------");
    console.log(`✅ Rescate completado.`);
    console.log(`⚠️ Se encontraron ${registrosConError.length} registros con errores o sin respuesta.`);
    console.log(`📂 Archivo generado: ${nombreArchivoErrores}`);
    console.log("-----------------------------------------");
}
catch (error) {
    console.error("❌ Error al procesar el rescate:", error.message);
}
//# sourceMappingURL=rescatar_errores.js.map