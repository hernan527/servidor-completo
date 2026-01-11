"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClinicaFullService = exports.updateItemFull = exports.deleteClinicaFull = exports.getJerarquiaData = exports.createClinicaConPlanes = exports.updateClinicaHandler = exports.deleteItemFull = exports.getJerarquia = exports.createItemFull = exports.updateClinicaFull = void 0;
const supabase_1 = require("../config/supabase"); // Asegúrate de que esta ruta sea correcta en tu proyecto
const error_handle_1 = require("../utils/error.handle");
/**
 * =========================================================================
 * SERVICIOS (Lógica de Negocio / Base de Datos)
 * =========================================================================
 */
/**
 * Actualiza una clínica y sincroniza su cartilla de planes.
 * Borra todas las filas de referencia en la tabla intermedia y las vuelve a crear.
 */
const updateClinicaFull = async (id, clinicaData, planIds) => {
    const clinicaIdNum = parseInt(id);
    try {
        // 1. LIMPIEZA POR REFERENCIA: Se eliminan todas las filas de la cartilla vieja para esta clínica
        const { error: deleteError } = await supabase_1.supabase
            .from('plan_clinica')
            .delete()
            .eq('clinica_id', clinicaIdNum);
        if (deleteError)
            throw deleteError;
        // 2. ACTUALIZACIÓN DE DATOS BÁSICOS: (Opcional) Si se enviaron cambios de la clínica
        if (clinicaData && Object.keys(clinicaData).length > 0) {
            const { error: updateError } = await supabase_1.supabase
                .from('clinicas')
                .update(clinicaData)
                .eq('id', clinicaIdNum);
            if (updateError)
                throw updateError;
        }
        // 3. REINSERCIÓN DE ROWS: Se crean los nuevos vínculos basados en los IDs seleccionados
        if (planIds && planIds.length > 0) {
            // Usamos Set para garantizar que no existan duplicados (como el 75 repetido)
            const uniqueIds = [...new Set(planIds)];
            const nuevasRows = uniqueIds.map(pId => ({
                clinica_id: clinicaIdNum,
                plan_id: parseInt(pId.toString()) // Aseguramos que sea Number para SQL
            }));
            const { error: insertError } = await supabase_1.supabase
                .from('plan_clinica')
                .insert(nuevasRows);
            if (insertError)
                throw insertError;
        }
        return { success: true, message: "Sincronización de cartilla exitosa" };
    }
    catch (error) {
        console.error("❌ Error en updateClinicaFull:", error.message);
        throw error;
    }
};
exports.updateClinicaFull = updateClinicaFull;
/**
 * Stubs para el resto de tus servicios (Deben implementar lógica similar)
 */
const createItemFull = async (data) => { };
exports.createItemFull = createItemFull;
const getJerarquia = async () => {
    // Esta función es la que va a buscar los datos a Supabase
    const { data, error } = await supabase_1.supabase
        .from('empresas')
        .select(`
      id,
      nombre,
      lineas:lineas_planes (
        nombre,
        planes (
          id,
          nombre_plan
        )
      )
    `);
    if (error)
        throw error;
    return data;
};
exports.getJerarquia = getJerarquia;
const deleteItemFull = async (id) => { };
exports.deleteItemFull = deleteItemFull;
exports.deleteClinicaFullService = exports.deleteItemFull;
/**
 * =========================================================================
 * CONTROLADORES (Manejo de Peticiones HTTP)
 * =========================================================================
 */
const updateClinicaHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { clinicaData, planIds } = req.body;
        if (!id)
            return res.status(400).json({ error: "ID de clínica no proporcionado" });
        // Llamamos al servicio con los 3 argumentos (ID, DATA de clínica, Array de Planes)
        const response = await (0, exports.updateClinicaFull)(id, clinicaData || {}, planIds || []);
        return res.status(200).json(response);
    }
    catch (error) {
        return (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_CLINICA_FULL", error);
    }
};
exports.updateClinicaHandler = updateClinicaHandler;
// Handlers adicionales que importas en tus rutas
const createClinicaConPlanes = async (req, res) => { };
exports.createClinicaConPlanes = createClinicaConPlanes;
const getJerarquiaData = async (req, res) => { };
exports.getJerarquiaData = getJerarquiaData;
const deleteClinicaFull = async (req, res) => { };
exports.deleteClinicaFull = deleteClinicaFull;
//# sourceMappingURL=clinicasConPlanes.supabase1.js.map