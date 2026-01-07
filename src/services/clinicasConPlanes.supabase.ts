import { supabase } from '../config/database';

const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;

/**
 * OBTIENE LA JERARQUÍA DE EMPRESAS > LÍNEAS > PLANES
 */
const getJerarquiaData = async () => {
  const { data: empresasData, error } = await supabase
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

  if (error) throw error;
  if (!empresasData) return [];

  return empresasData.map((emp: any) => {
    const grupos: Record<string, any> = {};
    
    emp.planes.forEach((plan: any) => {
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
const updateClinicaFull = async (id: string, clinicaData: any, planIds: string[]) => {
  console.log(`🔄 Intentando actualizar clínica ID: ${id}`);
  console.log('📦 Nuevos datos:', clinicaData);

  const { data: clinica, error: errorClinica } = await supabase
    .from('clinicas')
    .update(clinicaData)
    .eq('id', id)
    .select()
    .single();

  if (errorClinica) {
    console.error('❌ Error de Supabase al actualizar clínica:', errorClinica.message);
    throw errorClinica;
  }

  // Eliminamos vínculos anteriores
  console.log('🗑️ Limpiando vínculos antiguos en plan_clinica...');
  const { error: errorDelete } = await supabase.from('plan_clinica').delete().eq('clinica_id', id);
  
  if (errorDelete) {
    console.error('❌ Error al eliminar vínculos antiguos:', errorDelete.message);
  }

  if (planIds && planIds.length > 0) {
    console.log('🔗 Insertando nuevos vínculos:', planIds);
    const vinculos = planIds.map(planId => ({
      clinica_id: id,
      plan_id: planId
    }));
    
    const { error: errorVinculos } = await supabase.from('plan_clinica').insert(vinculos);
    if (errorVinculos) {
      console.error('❌ Error al re-vincular planes:', errorVinculos.message);
      throw errorVinculos;
    }
  }

  return { clinica, planesActualizados: planIds.length };
};

/**
 * ELIMINA UNA CLÍNICA (Y POR CASCADE SUS VÍNCULOS)
 */
const deleteClinicaFull = async (id: string) => {
  console.log(`🗑️ Eliminando clínica ID: ${id}`);
  const { error } = await supabase.from('clinicas').delete().eq('id', id);
  if (error) {
    console.error('❌ Error al eliminar clínica:', error.message);
    throw error;
  }
  return { success: true };
};

export { 
  createClinicaConPlanes, 
  getJerarquiaData, 
  updateClinicaFull, 
  deleteClinicaFull 
};