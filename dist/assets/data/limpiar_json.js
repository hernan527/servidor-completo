const fs = require('fs');
try {
    console.log("Leyendo archivo original...");
    const rawData = fs.readFileSync('./cotizaciones_finales.json', 'utf8');
    const cotizaciones = JSON.parse(rawData);
    console.log(`Procesando ${cotizaciones.length} registros...`);
    const datosOptimizados = cotizaciones.map((c) => {
        const nuevoObjeto = {};
        // 1. Conservamos el ID
        nuevoObjeto.id = c.id;
        // 2. Transformamos la respuesta
        if (c.respuesta && Array.isArray(c.respuesta)) {
            nuevoObjeto.r = c.respuesta.map(plan => ({
                i: plan.item_id,
                // Redondeamos los valores numéricos que quedan
                p: Math.round(plan.precio),
                // SE ELIMINÓ  r: plan.promoPorcentaje,              
                // SE ELIMINÓ 'd' (promoDescuento)
                v: Math.round(plan.valorLista),
                // SE ELIMINÓ aporteOS 
            }));
        }
        else {
            nuevoObjeto.r = [];
        }
        return nuevoObjeto;
    });
    const nombreArchivoNuevo = './cotizaciones_PROD.json';
    fs.writeFileSync(nombreArchivoNuevo, JSON.stringify(datosOptimizados));
    console.log("-----------------------------------------");
    console.log(`✅ ¡Limpieza y REDONDEO completado!`);
    console.log(`✂️ Campo 'promoDescuento' eliminado.`);
    console.log(`📂 Archivo generado: ${nombreArchivoNuevo}`);
    console.log("-----------------------------------------");
}
catch (error) {
    console.error("❌ Error:", error.message);
}
//# sourceMappingURL=limpiar_json.js.map