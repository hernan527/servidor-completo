"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupClinicas = void 0;
// ... otras importaciones
const regiones_1 = require("./../interfaces/regiones"); // Asegúrate de tener este tipo o constante
// La función getSelectedPlansData no se usa directamente en el servicio, se asume que está en otro archivo.
// import { getSelectedPlansData } from './planes'; 
// =======================================================
// FUNCIONES AUXILIARES (DEBEN SER MODIFICADAS PARA SER ASYNC O MANEJAR PROMISES)
// =======================================================
/**
 * Filtra las clínicas únicas de todos los productos.
 */
function getUniqueClinicas(products) {
    console.log(`[Service: UniqueClinicas] Iniciando extracción de clínicas únicas de ${products.length} productos.`);
    const clinicasMap = new Map();
    products.forEach((product, productIndex) => {
        product.clinicas.forEach((clinic, clinicIndex) => {
            if (!clinicasMap.has(clinic.item_id)) {
                clinicasMap.set(clinic.item_id, clinic);
            }
        });
    });
    const uniqueCount = clinicasMap.size;
    console.log(`[Service: UniqueClinicas] Finalizado. Se encontraron ${uniqueCount} clínicas únicas.`);
    return Array.from(clinicasMap.values());
}
/**
 * Transforma una única clínica en el formato de columna de la grilla.
 * (Ahora es síncrona ya que no hace llamadas a BD)
 */
function transformClinica(clinica, products) {
    const obj = {};
    // Log de la clínica que se está transformando
    console.log(`[Service: Transform] Transformando clínica ID: ${clinica.item_id}, Nombre: ${clinica.entity}`);
    // 1. Asigna las propiedades principales
    obj["nombre"] = clinica.entity;
    // La corrección para barrio estaba bien
    obj["barrio"] = clinica.ubicacion?.[0]?.barrio ?? '';
    // 2. Asigna los estados 'ok'/'no'
    products.forEach(product => {
        const id = product.item_id;
        // Verifica si la cartilla de la clínica incluye el ID del producto
        obj[id] = clinica.cartillas.includes(id) ? "ok" : "no";
    });
    // Log del objeto transformado
    console.log(`[Service: Transform] Objeto transformado para la grilla:`, obj);
    return obj;
}
/**
 * Agrupa las clínicas transformadas por región.
 */
async function groupAndMapClinicas(clinicas, products, regiones) {
    console.log(`[Service: GroupMap] Iniciando agrupación de ${clinicas.length} clínicas.`);
    const regionesValidas = Object.values(regiones);
    const resultadoAgrupado = {};
    for (const clinica of clinicas) {
        const regionEncontrada = regionesValidas.find((region) => clinica.ubicacion?.some((ubicacionItem) => ubicacionItem.region === region));
        if (regionEncontrada) {
            // Log de la región donde se agrupará
            console.log(`[Service: GroupMap] Clínica ${clinica.item_id} asignada a la región: ${regionEncontrada}`);
            // 🚨 IMPORTANTE: transformClinica es AHORA SÍNCRONA, por eso no lleva 'await'
            const transformedObj = transformClinica(clinica, products);
            resultadoAgrupado[regionEncontrada] = resultadoAgrupado[regionEncontrada] || [];
            resultadoAgrupado[regionEncontrada].push(transformedObj);
        }
        else {
            console.warn(`[Service: GroupMap] Clínica ${clinica.item_id} (${clinica.entity}) no pudo ser asignada a ninguna región válida.`);
        }
    }
    console.log(`[Service: GroupMap] Finalizada la agrupación. Regiones agrupadas: ${Object.keys(resultadoAgrupado).length}`);
    return resultadoAgrupado;
}
// =======================================================
// FUNCIÓN PRINCIPAL (groupClinicas)
// =======================================================
const groupClinicas = async (productsWithClinics) => {
    console.log(`[Service] Iniciando función principal groupClinicas. Productos recibidos: ${productsWithClinics.length}`);
    try {
        if (!productsWithClinics || productsWithClinics.length === 0) {
            console.warn(`[Service] Array de productos vacío o nulo. Retornando objeto vacío.`);
            return {};
        }
        // 3. Obtener el array de clínicas únicas de todos los productos
        const uniqueClinicas = getUniqueClinicas(productsWithClinics);
        // 4. Agrupar, mapear y transformar las clínicas
        // 🚨 Debes pasar el objeto de regiones. Asumo que está disponible o importado.
        const resultadoFinal = await groupAndMapClinicas(uniqueClinicas, productsWithClinics, regiones_1.RegionesConst // Asume que RegionesConst es el objeto/array de regiones
        );
        console.log(`[Service] groupClinicas finalizado. Estructura de resultado final:`, Object.keys(resultadoFinal));
        return resultadoFinal;
    }
    catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido en el servicio';
        console.error(`[Service] ERROR en groupClinicas: ${errorMessage}`, e);
        throw new Error('ERROR_GROUP_CLINICA_SERVICE');
    }
};
exports.groupClinicas = groupClinicas;
//# sourceMappingURL=compararclinicas.js.map