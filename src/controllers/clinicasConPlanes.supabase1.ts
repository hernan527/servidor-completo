/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { supabase } from '../config/supabase'; // Asegúrate de que esta ruta sea correcta en tu proyecto
import { handleHttp } from "../utils/error.handle";

/**
 * =========================================================================
 * SERVICIOS (Lógica de Negocio / Base de Datos)
 * =========================================================================
 */

/**
 * Actualiza una clínica y sincroniza su cartilla de planes.
 * Borra todas las filas de referencia en la tabla intermedia y las vuelve a crear.
 */
export const updateClinicaFull = async (id: string, clinicaData: any, planIds: string[]) => {
  const clinicaIdNum = parseInt(id);

  try {
    // 1. LIMPIEZA POR REFERENCIA: Se eliminan todas las filas de la cartilla vieja para esta clínica
    const { error: deleteError } = await supabase
      .from('plan_clinica')
      .delete()
      .eq('clinica_id', clinicaIdNum);

    if (deleteError) throw deleteError;

    // 2. ACTUALIZACIÓN DE DATOS BÁSICOS: (Opcional) Si se enviaron cambios de la clínica
    if (clinicaData && Object.keys(clinicaData).length > 0) {
      const { error: updateError } = await supabase
        .from('clinicas')
        .update(clinicaData)
        .eq('id', clinicaIdNum);
      
      if (updateError) throw updateError;
    }

    // 3. REINSERCIÓN DE ROWS: Se crean los nuevos vínculos basados en los IDs seleccionados
    if (planIds && planIds.length > 0) {
      // Usamos Set para garantizar que no existan duplicados (como el 75 repetido)
      const uniqueIds = [...new Set(planIds)];
      
      const nuevasRows = uniqueIds.map(pId => ({
        clinica_id: clinicaIdNum,
        plan_id: parseInt(pId.toString()) // Aseguramos que sea Number para SQL
      }));

      const { error: insertError } = await supabase
        .from('plan_clinica')
        .insert(nuevasRows);

      if (insertError) throw insertError;
    }

    return { success: true, message: "Sincronización de cartilla exitosa" };
  } catch (error: any) {
    console.error("❌ Error en updateClinicaFull:", error.message);
    throw error;
  }
};

/**
 * Stubs para el resto de tus servicios (Deben implementar lógica similar)
 */
export const createItemFull = async (data: any) => { /* lógica para crear */ };
export const getJerarquia = async () => {
  // Esta función es la que va a buscar los datos a Supabase
  const { data, error } = await supabase
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

  if (error) throw error;
  return data;
};
export const deleteItemFull = async (id: string) => { /* lógica para borrar */ };


/**
 * =========================================================================
 * CONTROLADORES (Manejo de Peticiones HTTP)
 * =========================================================================
 */

export const updateClinicaHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { clinicaData, planIds } = req.body; 

    if (!id) return res.status(400).json({ error: "ID de clínica no proporcionado" });

    // Llamamos al servicio con los 3 argumentos (ID, DATA de clínica, Array de Planes)
    const response = await updateClinicaFull(id, clinicaData || {}, planIds || []);
    
    return res.status(200).json(response);
  } catch (error: any) {
    return handleHttp(res, "ERROR_UPDATE_CLINICA_FULL", error);
  }
};

// Handlers adicionales que importas en tus rutas
export const createClinicaConPlanes = async (req: Request, res: Response) => { /* ... */ };
export const getJerarquiaData = async (req: Request, res: Response) => { /* ... */ };
export const deleteClinicaFull = async (req: Request, res: Response) => { /* ... */ };

/**
 * =========================================================================
 * EXPORTACIONES (Consistentes con tus imports)
 * =========================================================================
 */
export { 
  updateItemFull, // Si tienes un alias para updateClinicaFull
  deleteItemFull as deleteClinicaFullService // Renombrado para evitar colisión si es necesario
};