import { supabase } from '../config/database'; // Asegúrate de importar tu cliente

const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;

// Cambia (req: any) por (planData: any)
const createPlan = async (planData: any) => {
  // YA NO BUSQUES req.body aquí, usa planData directamente
  const plan = planData.plan; 
  console.log("item :  " , plan)
  // 1. Insertar en Supabase
  const { data, error } = await supabase
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

const getPlanesConTodo = async () => {
  const { data, error } = await supabase
    .from('planes')
    .select(`
      *,
      empresas!inner (
        *
      ), 
      plan_clinica (
        *,
        clinicas (*)
      )
    `)
    // FILTRO 1: La empresa DEBE tener listar en true. 
    // Gracias al !inner, si la empresa es false, el plan desaparece automáticamente.
    .eq('empresas.listar', true)
    
    // FILTRO 2: El plan individual también debe estar activo.
    .eq('listar', true);

  if (error) {
    console.error("Error en la consulta:", error.message);
    throw error;
  }
  
  return data;
};

const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('planes')
    .select('*')
    .eq('id', id)
    .single();
    
  return data;
};

// 1. UPDATE: Actualiza los datos y devuelve el objeto modificado
const updateProduct = async (id: string, data: any) => {
  // Limpiamos nulos si querés mantener la lógica que tenías en Mongo
  const cleanData = { ...data };
  Object.keys(cleanData).forEach(key => cleanData[key] === null && delete cleanData[key]);

  const { data: responseUpdate, error } = await supabase
    .from('planes')
    .update(cleanData)
    .eq('id', id)
    .select() // Esto hace que devuelva el objeto actualizado (equivalente a {new: true})
    .single();

  if (error) throw error;
  return responseUpdate;
};

// 2. DELETE: Borra por ID
const deleteProduct = async (id: string) => {
  const { data: responsedelete, error } = await supabase
    .from('planes')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return responsedelete; // Devuelve confirmación
};

// 3. SEARCH: Búsqueda por texto (Case Insensitive)
const searchProducts = async (query: string) => {
  // En Supabase/Postgres usamos .ilike para que no importe mayúsculas/minúsculas
  // El símbolo % es el comodín para buscar "contiene"
  const { data: responseSearch, error } = await supabase
    .from('planes')
    .select('*')
    .ilike('nombre', `%${query}%`); 

  if (error) throw error;
  return responseSearch;
};
// ... updateProduct y deleteProduct siguen la misma lógica de supabase.from().update() / delete()

export { createPlan, getPlanesConTodo, getProduct, updateProduct,deleteProduct, searchProducts };