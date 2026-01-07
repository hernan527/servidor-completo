import { supabase } from '../config/database'; // Asegúrate de importar tu cliente

const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;



// services/clinicas.supabase.ts
const getProducts = async () => {
  const { data, error } = await supabase
    .from('clinicas')
    .select(`
      *,
      plan_clinica (
        plan_id
      )
    `)
    .order('nombre', { ascending: true }); // Opcional: para que el dashboard esté ordenado
  
  if (error) {
    console.error("❌ Error en getProducts:", error);
    throw error;
  }
  return data;
};

const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('clinicas')
    .select('*')
    .eq('id', id)
    .single();
    
  return data;
};




// 3. SEARCH: Búsqueda por texto (Case Insensitive)
const searchProducts = async (query: string) => {
  // En Supabase/Postgres usamos .ilike para que no importe mayúsculas/minúsculas
  // El símbolo % es el comodín para buscar "contiene"
  const { data: responseSearch, error } = await supabase
    .from('clinicas')
    .select('*')
    .ilike('nombre', `%${query}%`); 

  if (error) throw error;
  return responseSearch;
};
// ... updateProduct y deleteProduct siguen la misma lógica de supabase.from().update() / delete()


export {  getProducts, getProduct, searchProducts };