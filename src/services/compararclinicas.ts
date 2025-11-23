// compararclinicas.ts

import { Response } from 'express';
// ... otras importaciones
import { RegionesConst } from './../interfaces/regiones'; // Asegúrate de tener este tipo o constante
import { Clinicas, ClinicasAgrupadas } from './../interfaces/clinicas'; // Asegúrate de tener este tipo
import { getSelectedPlansData } from './planes'; // La función para obtener productos de la BD

// =======================================================
// FUNCIONES AUXILIARES (DEBEN SER MODIFICADAS PARA SER ASYNC O MANEJAR PROMISES)
// =======================================================

/**
 * Filtra las clínicas únicas de todos los productos.
 */
function getUniqueClinicas(products: any[]): Clinicas[] {
    const clinicasMap = new Map<string, Clinicas>();

    products.forEach(product => {
        product.clinicas.forEach((clinic: Clinicas) => {
            if (!clinicasMap.has(clinic.item_id)) {
                clinicasMap.set(clinic.item_id, clinic);
            }
        });
    });

    return Array.from(clinicasMap.values());
}

/**
 * Transforma una única clínica en el formato de columna de la grilla.
 * (Ahora es síncrona ya que no hace llamadas a BD)
 */
function transformClinica(clinica: Clinicas, products: any[]): any {
    const obj: any = {};
    
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

    return obj;
}


/**
 * Agrupa las clínicas transformadas por región.
 */
async function groupAndMapClinicas(clinicas: Clinicas[], products: any[], regiones: RegionesConst): Promise<ClinicasAgrupadas> {
    const regionesValidas: string[] = Object.values(regiones);
    
    // El problema con el 'reduce' asíncrono en TypeScript es complejo.
    // Es mejor usar un Promise.all(map) o un bucle for/of simple para manejar la asincronía.
    
    const resultadoAgrupado: ClinicasAgrupadas = {};

    for (const clinica of clinicas) {
        const regionEncontrada: string | undefined = regionesValidas.find((region: string) => 
            clinica.ubicacion?.some((ubicacionItem) => ubicacionItem.region === region)
        );

        if (regionEncontrada) { 
            // 🚨 IMPORTANTE: transformClinica es AHORA SÍNCRONA, por eso no lleva 'await'
            const transformedObj = transformClinica(clinica, products);
            
            resultadoAgrupado[regionEncontrada] = resultadoAgrupado[regionEncontrada] || [];
            resultadoAgrupado[regionEncontrada].push(transformedObj);
        }
    }
    
    return resultadoAgrupado;
}


// =======================================================
// FUNCIÓN PRINCIPAL (groupClinics)
// =======================================================


const groupClinicas = async (productsWithClinics: any[]): Promise<ClinicasAgrupadas> => {
    try {
        // 🚨 ELIMINAR CÓDIGO INCORRECTO:
        // const { products: productIds } = req.body; // Esto es del controlador
        // if (!productIds || productIds.length === 0) { return {}; } // Esto es del controlador
        // const productsWithClinics = await obtenerPlanesConClinicas(productIds); // Esto es del controlador
        
        if (!productsWithClinics || productsWithClinics.length === 0) {
            return {}; 
        }
             
        // 3. Obtener el array de clínicas únicas de todos los productos
        const uniqueClinicas = getUniqueClinicas(productsWithClinics);
        
        // 4. Agrupar, mapear y transformar las clínicas
        // 🚨 Debes pasar el objeto de regiones. Asumo que está disponible o importado.
        const resultadoFinal = await groupAndMapClinicas(
            uniqueClinicas, 
            productsWithClinics, 
            RegionesConst // Asume que RegionesConst es el objeto/array de regiones
        );
        return resultadoFinal;
    } catch (e) {
        console.error(e);
        throw new Error('ERROR_GROUP_CLINICA_SERVICE'); 
    }
};

export { groupClinicas };