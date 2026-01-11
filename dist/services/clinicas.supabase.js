"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getProduct = exports.getProducts = void 0;
// services/clinicas.supabase.ts
const database_1 = require("../config/database");
// 1. LISTADO (Ya lo tenías bien)
const getProducts = async () => {
    const { data, error } = await database_1.supabase
        .from('clinicas')
        .select(`
      *,
      plan_clinica (
        plan_id
      )
    `)
        .order('nombre', { ascending: true });
    if (error)
        throw error;
    return data;
};
exports.getProducts = getProducts;
// 2. DETALLE (ESTE ES EL QUE TENEMOS QUE ARREGLAR PARA EL HITO)
const getProduct = async (id) => {
    const { data, error } = await database_1.supabase
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
exports.getProduct = getProduct;
// 3. SEARCH
const searchProducts = async (query) => {
    const { data, error } = await database_1.supabase
        .from('clinicas')
        .select(`
      *,
      plan_clinica (
        plan_id
      )
    `) // También lo agregamos acá por si buscás en el admin
        .ilike('nombre', `%${query}%`);
    if (error)
        throw error;
    return data;
};
exports.searchProducts = searchProducts;
//# sourceMappingURL=clinicas.supabase.js.map