"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanes = exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
exports.obtenerPlanesConClinicas = obtenerPlanesConClinicas;
exports.getSelectedPlansData = getSelectedPlansData;
const planes_1 = __importDefault(require("./../models/planes"));
const mongoose_1 = __importDefault(require("mongoose")); // <-- ¡Añade esta línea!
// Asegúrate de importar tu conexión o modelo de Mongoose (si usas Mongoose)
// const mongoose = require('mongoose');
async function obtenerPlanesConClinicas() {
    try {
        console.log("--- INICIO: Actualización de la estructura de datos ---");
        // ⚠️ Importante: Reemplaza 'PlanesModel' y 'ClinicasModel' con tus modelos reales
        const ClinicasModel = mongoose_1.default.connection.collection('clinicas');
        const PlanesModel = mongoose_1.default.connection.collection('planes');
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
                                _id: 1, // ID de MongoDB de la clínica (siempre necesario)
                                item_id: 1, // ID de negocio
                                nombre: 1, // Nombre (necesario busqueda para mostrar al usuario)
                                entity: 1, // entity (necesario para mostrar)
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
        return planesActualizados;
    }
    catch (error) {
        console.error("ERROR crítico en la secuencia de agregación:", error);
        throw error; // Propagar el error a la ruta
    }
}
async function getSelectedPlansData(productIds) {
    // Usamos el array de IDs para obtener solo los documentos necesarios.
    const planesFiltrados = await planes_1.default.find({
        item_id: { $in: productIds }
    }).lean();
    return planesFiltrados;
}
// Use the models as needed
// import { ClinicasModel, CotizacionModel, EmployeesModel, EmpresasModel,ItemModel,PlanesModel,UsersModel,PlanesModel} from '../models';
const createProduct = async (item) => {
    const responseCreate = await planes_1.default.create(item);
    return responseCreate;
};
exports.createProduct = createProduct;
const getProducts = async () => {
    const responseGet = await planes_1.default.find({});
    console.log("responseGet  :", responseGet);
    return responseGet;
};
exports.getProducts = getProducts;
const getProduct = async (id) => {
    const responseGetOne = await planes_1.default.findOne({ _id: id });
    console.log(' responseGetOne : ', id);
    return responseGetOne;
};
exports.getProduct = getProduct;
const updateProduct = async (id, data) => {
    const responseUpdate = await planes_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const responsedelete = await planes_1.default.deleteOne({ _id: id });
    return responsedelete;
};
exports.deleteProduct = deleteProduct;
const searchProducts = async (query) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await planes_1.default.find({
        concept: { $regex: query, $options: 'i' },
    });
    return responseSearch;
};
exports.searchProducts = searchProducts;
const getPlanes = async () => {
    const responseGet = await obtenerPlanesConClinicas();
    return responseGet;
};
exports.getPlanes = getPlanes;
//# sourceMappingURL=planes.js.map