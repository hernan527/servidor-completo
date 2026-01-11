"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJerarquiaData = exports.updatePrestacionesPlanService = exports.getPrestacionesMaestras = exports.searchProducts = exports.deleteProduct = exports.getProduct = exports.getPlanesConTodo = exports.createPlan = exports.createPrestacionesMaestras = void 0;
const database_1 = require("../config/database"); // Asegúrate de importar tu cliente
const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;
// Cambia (req: any) por (planData: any)
const createPlan = async (planData) => {
    // YA NO BUSQUES req.body aquí, usa planData directamente
    const plan = planData.plan;
    console.log("item :  ", plan);
    // 1. Insertar en Supabase
    const { data, error } = await database_1.supabase
        .from('planes')
        .insert([plan]) // Asegúrate que 'item' tenga las columnas: nombre_plan, empresa_id, etc.
        .select()
        .single();
    if (error) {
        console.error("Error de Supabase al insertar:", error.message);
        throw error;
    }
    // 2. Híbrido: Disparar a n8n (opcional para clínicas, vital para leads)
    if (N8N_WEBHOOK) {
        fetch(N8N_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'PLAN_CREADO', data })
        }).catch(err => console.error("Error n8n:", err));
    }
    return data;
};
exports.createPlan = createPlan;
const getPlanesConTodo = async () => {
    const { data, error } = await database_1.supabase
        .from('planes')
        .select(`
      *,
      empresas!inner (
        *
      ), 
      plan_clinica (
        clinicas (*)
      ),
      plan_prestacion ( 
      prestacion_id,
      valor,
      listar,
        prestaciones_maestras (
          nombre,
          icono_emoji
        )
      )
    `)
        .eq('empresas.listar', true)
        .eq('listar', true)
        // Agregamos un orden para que los beneficios respeten el 'orden' que definimos
        .order('orden', { foreignTable: 'plan_prestacion', ascending: true });
    if (error) {
        console.error("❌ Error real de Supabase:", error.message);
        throw error;
    }
    console.log('✅ hola getItems plans2 - Data cargada correctamente');
    return data;
};
exports.getPlanesConTodo = getPlanesConTodo;
const getProduct = async (id) => {
    const { data, error } = await database_1.supabase
        .from('planes')
        .select('*')
        .eq('id', id)
        .single();
    return data;
};
exports.getProduct = getProduct;
// 2. DELETE: Borra por ID
const deleteProduct = async (id) => {
    const { data: responsedelete, error } = await database_1.supabase
        .from('planes')
        .delete()
        .eq('id', id);
    if (error)
        throw error;
    return responsedelete; // Devuelve confirmación
};
exports.deleteProduct = deleteProduct;
// 3. SEARCH: Búsqueda por texto (Case Insensitive)
const searchProducts = async (query) => {
    // En Supabase/Postgres usamos .ilike para que no importe mayúsculas/minúsculas
    // El símbolo % es el comodín para buscar "contiene"
    const { data: responseSearch, error } = await database_1.supabase
        .from('planes')
        .select('*')
        .ilike('nombre', `%${query}%`);
    if (error)
        throw error;
    return responseSearch;
};
exports.searchProducts = searchProducts;
// controllers/planes.ts
// Este es el que REALMENTE debe llamar el endpoint /prestaciones-maestras
const getPrestacionesMaestras = async () => {
    const { data, error } = await database_1.supabase
        .from('prestaciones_maestras') // 🔥 APUNTAMOS A LA TABLA MAESTRA, NO A PLANES
        .select('*')
        .order('nombre', { ascending: true }); // Opcional: Ordenarlas por nombre
    if (error) {
        console.error("Error en Supabase:", error);
        throw error;
    }
    return data;
};
exports.getPrestacionesMaestras = getPrestacionesMaestras;
// Este es el que REALMENTE debe llamar el endpoint /prestaciones-maestrasconst createPrestacionMaestra = async (req: Request, res: Response) => {
const createPrestacionesMaestras = async (data) => {
    const { nombre, icono, icono_emoji, categoria } = data;
    console.log('Service createPrestacionesMaestras');
    const { data: result, error } = await database_1.supabase
        .from('prestaciones_maestras')
        .insert([{
            nombre,
            icono_emoji: icono_emoji || '✅',
            categoria: categoria || 'Beneficios',
            icono: icono || "Activity"
        }])
        .select()
        .single();
    if (error)
        throw error;
    return result;
};
exports.createPrestacionesMaestras = createPrestacionesMaestras;
const updatePrestacionesPlanService = async (planId, prestaciones) => {
    try {
        console.log(`--- 🛠️ INICIANDO TABLA INTERMEDIA PARA PLAN ID: ${planId} ---`);
        if (!prestaciones || prestaciones.length === 0) {
            console.log("⚠️ No llegaron prestaciones para insertar.");
            return;
        }
        // 1. Borrado (Logueamos cuántas filas borra)
        const { count, error: delError } = await database_1.supabase
            .from('plan_prestacion')
            .delete()
            .eq('plan_id', planId);
        if (delError)
            throw delError;
        console.log(`✅ Borrado previo exitoso.`);
        // 2. Mapeo y Limpieza
        // En el Backend: updatePrestacionesPlanService
        const rows = prestaciones
            .filter(p => p.prestacion_id !== undefined && p.prestacion_id !== null) // 🔥 FILTRO DE SEGURIDAD
            .map(p => ({
            plan_id: planId,
            prestacion_id: p.prestacion_id,
            valor: p.valor || '',
            listar: p.listar ?? true
        }));
        console.log("🚀 Intentando insertar las siguientes filas:");
        console.table(rows); // Esto te muestra una tabla hermosa en la terminal
        // 3. Inserción
        const { data, error: insError } = await database_1.supabase
            .from('plan_prestacion')
            .insert(rows)
            .select(); // El .select() es clave para confirmar que se guardó
        if (insError) {
            console.error("❌ ERROR AL INSERTAR PRESTACIONES:", insError.message);
            console.error("🔍 DETALLE:", insError.details);
            throw insError;
        }
        console.log("🎉 INSERCIÓN EXITOSA. Filas creadas:", data?.length);
    }
    catch (error) {
        console.error("💥 FALLO CRÍTICO EN updatePrestacionesPlanService:", error.message);
        throw error; // Re-lanzamos para que el controlador capture el 500
    }
};
exports.updatePrestacionesPlanService = updatePrestacionesPlanService;
/**
 * OBTIENE LA JERARQUÍA DE EMPRESAS > LÍNEAS > PLANES
 */
const getJerarquiaData = async () => {
    const { data: empresasData, error } = await database_1.supabase
        .from('empresas')
        .select(`
      id,
      nombre,
      planes (
        id, 
        nombre_plan,
        precio,
        linea
      )
    `)
        .order('nombre');
    if (error)
        throw error;
    if (!empresasData)
        return [];
    return empresasData.map((emp) => {
        const grupos = {};
        emp.planes.forEach((plan) => {
            const nombreGrupo = (plan.linea && typeof plan.linea === 'string' && plan.linea.trim() !== "")
                ? plan.linea.trim()
                : "Individuales";
            if (!grupos[nombreGrupo]) {
                grupos[nombreGrupo] = {
                    nombre: nombreGrupo,
                    planes: []
                };
            }
            grupos[nombreGrupo].planes.push(plan);
        });
        return {
            id: emp.id,
            nombre: emp.nombre,
            lineas: Object.values(grupos)
        };
    });
};
exports.getJerarquiaData = getJerarquiaData;
//# sourceMappingURL=planes.supabase.js.map