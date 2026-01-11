"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClinicaHandler = exports.deleteItemFull = exports.updateItemFull = exports.createItemFull = void 0;
const error_handle_1 = require("../utils/error.handle");
const clinicasConPlanes_supabase_1 = require("../services/clinicasConPlanes.supabase");
/**
 * ACTUALIZAR CLÍNICA (Y su cartilla de planes)
 * Borra las filas anteriores y pone las nuevas
 */
const updateItemFull = async (req, res) => {
    try {
        const { id } = req.params;
        // 1. Extraemos los 3 datos que vienen del front
        const { clinicaData, planIds, atributoIds } = req.body;
        // 2. Pasamos los 4 argumentos (id + los 3 del body)
        // Agregamos el "atributoIds || []" al final para que no chille TS
        const response = await (0, clinicasConPlanes_supabase_1.updateClinicaFull)(id, clinicaData || {}, planIds || [], atributoIds || []);
        res.status(200).json(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE_CLINICA_FULL');
    }
};
exports.updateItemFull = updateItemFull;
/**
 * ELIMINAR CLÍNICA (Y sus referencias)
 */
const deleteItemFull = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, clinicasConPlanes_supabase_1.deleteClinicaFull)(id);
        res.status(200).json(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE_CLINICA_FULL');
    }
};
exports.deleteItemFull = deleteItemFull;
/**
 * CREAR CLÍNICA (Con planes iniciales)
 */
const createItemFull = async (req, res) => {
    console.log("📥 BACKEND: Body recibido:", req.body);
    try {
        const { clinicaData, planIds } = req.body;
        console.log("🧪 BACKEND: clinicaData extraído:", clinicaData);
        console.log("🧪 BACKEND: planIds extraído:", planIds);
        const response = await (0, clinicasConPlanes_supabase_1.createClinicaConPlanes)(clinicaData, planIds);
        res.status(201).json(response);
    }
    catch (e) {
        console.error("💥 BACKEND: Fallo en createItemFull:", e);
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_CLINICA_FULL');
    }
};
exports.createItemFull = createItemFull;
// src/controllers/clinicasConPlanes.supabase.ts
const updateClinicaHandler = async (req, res) => {
    try {
        const { id } = req.params;
        // 1. Extraemos 'atributoIds' del body que viene del frontend
        const { clinicaData, planIds, atributoIds } = req.body;
        // 2. Pasamos los 4 argumentos al Service (esto mata el error TS2554)
        const response = await (0, clinicasConPlanes_supabase_1.updateClinicaFull)(id, clinicaData || {}, planIds || [], atributoIds || [] // <--- El argumento que faltaba
        );
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Error en updateClinicaHandler:", error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.updateClinicaHandler = updateClinicaHandler;
//# sourceMappingURL=clinicasConPlanes.supabase.js.map