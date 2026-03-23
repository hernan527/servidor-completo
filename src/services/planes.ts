import ClinicasModel from './../models/clinicas';
import PlanesModel from "./../models/planes";
import { Clinicas } from '../interfaces/clinicas';
import mongoose from 'mongoose'; // <-- ¡Añade esta línea!
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// Define el tipo de tu objeto de regiones para que TypeScript lo entienda mejor
interface RegionesConst {
    [key: string]: string; 
}

// Define el tipo de la salida (el objeto agrupado)
interface ClinicasAgrupadas {
    [region: string]: any[]; // O ClinicaTransformada[], si defines ese tipo
}


// Asegúrate de importar tu conexión o modelo de Mongoose (si usas Mongoose)
// const mongoose = require('mongoose');



async function obtenerPlanesConClinicas() {
  try {
    console.log("--- INICIO: Actualización de la estructura de datos ---");
    
    // ⚠️ Importante: Reemplaza 'PlanesModel' y 'ClinicasModel' con tus modelos reales
    const ClinicasModel = mongoose.connection.collection('clinicas');
    const PlanesModel = mongoose.connection.collection('planes');

    // # FASE 1: ACTUALIZAR CLINICAS (Preparación de 'cartillas')
    console.log("Fase 1/2: Actualizando la colección 'clinicas' con la propiedad 'cartillas'.");
    await ClinicasModel.aggregate([
      // [código de la Fase 1: une cartillasenclinicas para llenar clinicas.cartillas]
      { $lookup: { from: "cartillasenclinicas", let: { clinica_id: { $toString: "$item_id" } }, pipeline: [{ $match: { $expr: { $eq: ["$$clinica_id", { $toString: "$item_id" }] } } }], as: "propiedad_data" } },
      { $unwind: { path: "$propiedad_data", preserveNullAndEmptyArrays: true } },
      { $set: { "cartillas": { $ifNull: ["$propiedad_data.cartillas", []] } } },
      { $unset: "propiedad_data" },
      { $merge: { into: "clinicas", on: "_id", whenMatched: "merge", whenNotMatched: "fail" } }
    ]).toArray();

    // # FASE 2: ACTUALIZAR PLANES (Utiliza la colección 'clinicas' recién actualizada)
    console.log("Fase 2/2: Actualizando la colección 'planes' con las clínicas asociadas (Referencia Ligera).");
    await PlanesModel.aggregate([
      {
        $lookup: {
          from: "clinicas",
          let: { plan_id: { $trim: { input: { $toString: { $ifNull: ["$item_combine", ""] } } } } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    "$$plan_id",
                    {
                      $map: {
                        input: "$cartillas",
                        as: "c",
                        in: { $trim: { input: { $toString: { $ifNull: ["$$c", ""] } } } } 
                      }
                    }
                  ]
                }
              }
            },
            // 🚨 CLAVE DE OPTIMIZACIÓN: Proyectamos solo la REFERENCIA LIGERA
            { 
              $project: {
                _id: 1,           // ID de MongoDB de la clínica (siempre necesario)
                item_id: 1,       // ID de negocio
                nombre: 1,        // Nombre (necesario busqueda para mostrar al usuario)
                entity: 1,        // entity (necesario para mostrar)
                ubicacion: 1
                // Omitimos intencionalmente 'cartillas' y 'coberturas' para evitar el payload pesado.
              } 
            }
          ],
          as: "clinicas_asociadas"
        }
      },
      { $set: { "clinicas": "$clinicas_asociadas" } },
      { $merge: { into: "planes", on: "_id", whenMatched: "merge", whenNotMatched: "fail" } }
    ]).toArray(); 


    // Devolver los resultados finales de los planes actualizados
    console.log("--- FIN: Operación completada con éxito. ---");
    const planesActualizados = await PlanesModel.find({}).toArray();

console.log("Fase 3: Sincronizando relaciones con Supabase (Traducción de IDs)...");

// 1. Traemos la lista de planes desde Supabase para tener el mapeo (id <-> item_id)
const { data: planesSupabase, error: errorPlanes } = await supabase
    .from('planes')
    .select('id, item_id');

if (errorPlanes) throw errorPlanes;

// 2. Creamos un mapa rápido para buscar el ID numérico por item_id
// Esto es mucho más rápido que hacer un .find() dentro de un loop
const mapaId = new Map(planesSupabase.map(p => [p.item_id, p.id]));

// 3. Obtenemos los planes que acabamos de actualizar en Mongo

// 4. Construimos las relaciones usando el ID numérico traducido
const relacionesParaSupabase = planesActualizados.flatMap(planMongo => {
    // Buscamos el ID numérico en nuestro mapa usando el item_id de Mongo
    const planIdNumerico = mapaId.get(planMongo.item_id);

    if (!planIdNumerico) {
        console.warn(`⚠️ Plan con item_id ${planMongo.item_id} no encontrado en Supabase. Saltando...`);
        return [];
    }

    return (planMongo.clinicas || []).map((clinica: { item_id: any; }) => ({
        plan_id: planIdNumerico, // El ID numérico (BigInt) que Supabase quiere
        clinica_id: clinica.item_id // O clinica.id si las clínicas también son numéricas
    }));
});

// 5. Limpiamos y cargamos en la tabla intermedia
if (relacionesParaSupabase.length > 0) {
    await supabase.from('plan_clinica').delete().neq('plan_id', 0);
    const { error: insertError } = await supabase.from('plan_clinica').insert(relacionesParaSupabase);
    if (insertError) throw insertError;
    console.log(`✅ Sincronización exitosa: ${relacionesParaSupabase.length} relaciones.`);
}

    console.log(`--- Sincronización exitosa: ${relacionesParaSupabase.length} relaciones en Supabase. ---`);
    

    return planesActualizados;

  } catch (error) {
    console.error("ERROR crítico en la secuencia de agregación:", error);
    throw error; // Propagar el error a la ruta
  }
}

async function getSelectedPlansData(productIds: string[]) {
    // Usamos el array de IDs para obtener solo los documentos necesarios.
    const planesFiltrados = await PlanesModel.find({
        item_id: { $in: productIds } 
    }).lean(); 
    
    return planesFiltrados;
}


// Use the models as needed



// import { ClinicasModel, CotizacionModel, EmployeesModel, EmpresasModel,ItemModel,PlanesModel,UsersModel,PlanesModel} from '../models';


  
const createProduct = async (item: any) => {
    const responseCreate = await PlanesModel.create(item)
    return responseCreate;
};

const getProducts = async (

) => {
    const responseGet = await PlanesModel.find({});
    console.log("responseGet  :",responseGet)
    return responseGet
};

const getProduct = async (id: string) => {
   

    
    const responseGetOne = await PlanesModel.findOne({_id:id})
    console.log( ' responseGetOne : ', id)

    return responseGetOne
};

const updateProduct = async (id: string, data: any) => {
    const responseUpdate = await PlanesModel.findOneAndUpdate({_id:id},data,{new: true})
    return responseUpdate
};

const deleteProduct = async (id: string) => {
    const responsedelete = await PlanesModel.deleteOne({_id:id})
    return responsedelete
};

const searchProducts = async (query: string) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await PlanesModel.find({
        concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
    })
    return responseSearch
};

const getPlanes = async () => {

    const responseGet = await obtenerPlanesConClinicas();

    return responseGet
}; 
export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts ,getPlanes};

export { obtenerPlanesConClinicas, getSelectedPlansData };
