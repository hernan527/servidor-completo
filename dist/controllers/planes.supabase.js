"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrestacion = exports.getJerarquia = exports.updatePrestacionesPlan = exports.getPrestaciones = exports.searchItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const database_1 = require("../config/database"); // Asegúrate de importar tu cliente
const planes_supabase_1 = require("../services/planes.supabase");
const getItems = async (req, res) => {
    try {
        const response = await (0, planes_supabase_1.getPlanesConTodo)();
        console.log('hola getItems plans');
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PLANES');
    }
};
exports.getItems = getItems;
const getPrestaciones = async (req, res) => {
    try {
        const response = await (0, planes_supabase_1.getPrestacionesMaestras)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PRESTACIONES');
    }
};
exports.getPrestaciones = getPrestaciones;
const createPrestacion = async (req, res) => {
    try {
        // 🔍 Verificamos que el body no venga vacío
        if (!req.body.nombre) {
            return res.status(400).json({ error: "El nombre es obligatorio" });
        }
        // Llamamos al servicio pasando el body
        const response = await (0, planes_supabase_1.createPrestacionesMaestras)(req.body);
        // Respondemos con el objeto creado
        return res.status(201).json(response);
    }
    catch (e) {
        console.error("Error en controller:", e);
        return res.status(500).json({ error: "ERROR_CREATE_PRESTACION" });
    }
};
exports.createPrestacion = createPrestacion;
const updatePrestacionesPlan = async (req, res) => {
    try {
        const { id } = req.params;
        // Buscamos 'prestaciones' (el array de objetos del front) 
        // o 'prestacionIds' (por si acaso)
        const prestacionesArray = req.body.prestaciones || req.body.prestacionIds || req.body;
        console.log("--- 📥 CONTROLADOR PRESTACIONES ---");
        console.log("ID Plan:", id);
        console.log("Datos recibidos:", JSON.stringify(prestacionesArray, null, 2));
        // Validamos que sea un array antes de seguir
        if (!Array.isArray(prestacionesArray)) {
            console.error("❌ El body no es un array válido");
            return res.status(400).json({ error: "Se esperaba un array de prestaciones" });
        }
        const response = await (0, planes_supabase_1.updatePrestacionesPlanService)(id, prestacionesArray);
        // IMPORTANTE: Siempre devolver un JSON para evitar el error de 'Unexpected end of JSON'
        return res.status(200).json({ success: true, data: response });
    }
    catch (e) {
        console.error("❌ Error en updatePrestacionesPlan Controller:", e.message);
        return res.status(500).json({ error: 'ERROR_UPDATE_PRESTACIONES_PLAN' });
    }
};
exports.updatePrestacionesPlan = updatePrestacionesPlan;
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, planes_supabase_1.getProduct)(id);
        const data = response ? response : "NOT_FOUND";
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_PLAN_BY_ID');
    }
};
exports.getItemById = getItemById;
const createItem = async (req, res) => {
    try {
        // IMPORTANTE: Asegúrate de que req.body tenga la estructura que espera tu service
        const responseItem = await (0, planes_supabase_1.createPlan)(req.body);
        // Si el servicio devuelve un error de Supabase, lanzamos el error para que handleHttp lo capture
        if (!responseItem)
            throw new Error("No se pudo crear el plan");
        res.status(201).send(responseItem);
    }
    catch (e) {
        console.error("Error detallado en createItem:", e); // Esto lo verás en la terminal de VS Code
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_PLAN');
    }
};
exports.createItem = createItem;
// Este es el controlador que Express llama
const updateItem = async (req, res) => {
    try {
        // Aquí sacamos el ID de los parámetros de la URL
        const { id } = req.params;
        // Aquí ejecutamos la lógica que antes tenías en updateProduct
        // Pero la hacemos aquí mismo o llamamos a una función que NO sea un controlador
        console.log("=== DEBUG GUARDADO PLAN ===");
        console.log("ID RECIBIDO:", id);
        const { data, error } = await database_1.supabase
            .from('planes')
            .update({
            nombre_plan: req.body.nombre_plan || req.body.nombre,
            empresa_id: req.body.empresa_id,
            precio: req.body.precio,
            linea: req.body.linea,
            listar: req.body.listar ?? req.body.activo
        })
            .eq('id', id);
        if (error) {
            console.error("❌ ERROR TABLA PLANES:", error.message);
            return res.status(500).json({ error: error.message });
        }
        // DENTRO DE TU CONTROLADOR
        if (req.body.prestaciones) {
            console.log("Esperando a que las prestaciones se guarden...");
            await (0, planes_supabase_1.updatePrestacionesPlanService)(id, req.body.prestaciones); // <-- EL AWAIT ES OBLIGATORIO
        }
        return res.status(200).json({ success: true });
    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, planes_supabase_1.deleteProduct)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE');
    }
};
exports.deleteItem = deleteItem;
const searchItem = async (req, res) => {
    try {
        const { query } = req.params;
        const response = await (0, planes_supabase_1.searchProducts)(query);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SEARCH');
    }
};
exports.searchItem = searchItem;
/**
 * OBTENER JERARQUÍA (Para el formulario del Frontend)
 * Trae Empresas -> Líneas -> Planes
 */
const getJerarquia = async (req, res) => {
    try {
        const response = await (0, planes_supabase_1.getJerarquiaData)();
        if (!response) {
            return res.status(200).json([]);
        }
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ error: 'ERROR_GET_JERARQUIA' });
    }
};
exports.getJerarquia = getJerarquia;
//# sourceMappingURL=planes.supabase.js.map