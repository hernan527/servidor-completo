// services/clinicas.supabase.ts
import { supabase } from '../config/database';

// 1. LISTADO (Ya lo tenías bien)
const getProducts = async () => {
  const { data, error } = await supabase
    .from('clinicas')
    .select(`
      *,
      plan_clinica (
        plan_id
      )
    `)
    .order('nombre', { ascending: true });
  
  if (error) throw error;
  return data;
};

// 2. DETALLE (ESTE ES EL QUE TENEMOS QUE ARREGLAR PARA EL HITO)
const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('clinicas')
    .select(`
      *,
      plan_clinica (
        plan_id
      )
    `) // <--- Agregamos esto para que traiga los planes tildados
    .eq('id', id)
    .maybeSingle(); // Usamos maybeSingle en lugar de single para evitar el error 500 si no existe
    
  if (error) {
    console.error("❌ Error en getProduct Supabase:", error);
    throw error;
  }
  return data;
};

// 3. SEARCH
const searchProducts = async (query: string) => {
  const { data, error } = await supabase
    .from('clinicas')
    .select(`
      *,
      plan_clinica (
        plan_id
      )
    `) // También lo agregamos acá por si buscás en el admin
    .ilike('nombre', `%${query}%`); 

  if (error) throw error;
  return data;
};

export { getProducts, getProduct, searchProducts };