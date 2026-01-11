import { supabase } from '../config/database';

const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;


/**
 * CREA UNA CLÍNICA Y SUS VÍNCULOS CON PLANES
 */
const createClinicaConPlanes = async (clinicaData: any, planIds: string[]) => {
  console.log('🚀 Intentando crear clínica con datos:', clinicaData);

  const { data: clinica, error: errorClinica } = await supabase
    .from('clinicas')
    .insert([clinicaData])
    .select()
    .single();

  if (errorClinica) {
    console.error('❌ Error de Supabase al insertar clínica:', errorClinica.message, errorClinica.details);
    throw errorClinica;
  }

  console.log('✅ Clínica creada exitosamente, ID:', clinica.id);

  if (planIds && planIds.length > 0) {
    console.log('🔗 Vinculando planes:', planIds);
    const vinculos = planIds.map(planId => ({
      clinica_id: clinica.id,
      plan_id: planId
    }));

    const { error: errorVinculos } = await supabase
      .from('plan_clinica') 
      .insert(vinculos);

    if (errorVinculos) {
      console.error('❌ Error de Supabase al vincular planes:', errorVinculos.message);
      throw errorVinculos;
    }
  }

  return { clinica, planesVinculados: planIds.length };
};

/**
 * ACTUALIZA UNA CLÍNICA Y RECONSTRUYE SU CARTILLA
 */
// src/services/clinicasConPlanes.supabase.ts
// src/services/clinicasConPlanes.supabase.ts

// src/services/clinicasConPlanes.supabase.ts

// En src/services/clinicasConPlanes.supabase.ts

const updateClinicaFull = async (id: string, clinicaData: any, planIds: any[], atributoIds: any[]) => {
  const clinicaIdNum = parseInt(id);

  try {
    // 🚀 PASO 0: ACTUALIZAR LOS DATOS BÁSICOS (Incluyendo las imágenes)
    const { error: updateError } = await supabase
      .from('clinicas')
      .update({
        nombre_abreviado: clinicaData.nombre_abreviado,
        nombre: clinicaData.nombre,
        descripcion: clinicaData.descripcion,
        imagenes: clinicaData.imagenes,       // 🔥 AQUÍ SE GUARDAN LAS URLS
        ubicaciones: clinicaData.ubicaciones,
        especialidades: clinicaData.especialidades,
        url: clinicaData.url
      })
      .eq('id', clinicaIdNum);

    if (updateError) throw updateError;

    // 1. LIMPIEZA DE PLANES (Tu código actual)
    await supabase.from('plan_clinica').delete().eq('clinica_id', clinicaIdNum);
    if (planIds?.length > 0) {
      const planRows = [...new Set(planIds)].map(pId => ({
        clinica_id: clinicaIdNum,
        plan_id: Number(pId)
      }));
      await supabase.from('plan_clinica').insert(planRows);
    }

    // 2. LIMPIEZA DE ATRIBUTOS (Tu código actual)
    await supabase.from('clinica_atributo').delete().eq('clinica_id', clinicaIdNum);
    if (atributoIds?.length > 0) {
      const attrRows = [...new Set(atributoIds)].map(aId => ({
        clinica_id: clinicaIdNum,
        atributo_id: Number(aId)
      }));
      await supabase.from('clinica_atributo').insert(attrRows);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error en updateClinicaFull:", error.message);
    throw error;
  }
};

/**
 * 4. ELIMINAR CLÍNICA FULL
 */
const deleteClinicaFull = async (id: string) => {
  const { error } = await supabase
    .from('clinicas')
    .delete()
    .eq('id', parseInt(id));

  if (error) throw error;
  return { success: true };
};

export { 
  createClinicaConPlanes,  
  updateClinicaFull, 
  deleteClinicaFull
};