"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const database_1 = require("../config/database"); // Asegúrate de importar tu cliente
const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;
const createProduct = async (req) => {
    const item = req.body;
    // 1. Insertar en Supabase
    const { data, error } = await database_1.supabase
        .from('atributos')
        .insert([item])
        .select()
        .single();
    if (error)
        throw error;
    // 2. Híbrido: Disparar a n8n (opcional para clínicas, vital para leads)
    if (N8N_WEBHOOK) {
        fetch(N8N_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'CLINICA_CREADA', data })
        }).catch(err => console.error("Error n8n:", err));
    }
    return data;
};
exports.createProduct = createProduct;
const getProducts = async () => {
    const { data, error } = await database_1.supabase
        .from('atributos')
        .select('*');
    if (error)
        throw error;
    return data;
};
exports.getProducts = getProducts;
const getProduct = async (id) => {
    const { data, error } = await database_1.supabase
        .from('atributos')
        .select('*')
        .eq('id', id)
        .single();
    return data;
};
exports.getProduct = getProduct;
// 1. UPDATE: Actualiza los datos y devuelve el objeto modificado
const updateProduct = async (id, data) => {
    // Limpiamos nulos si querés mantener la lógica que tenías en Mongo
    const cleanData = { ...data };
    Object.keys(cleanData).forEach(key => cleanData[key] === null && delete cleanData[key]);
    const { data: responseUpdate, error } = await database_1.supabase
        .from('atributos')
        .update(cleanData)
        .eq('id', id)
        .select() // Esto hace que devuelva el objeto actualizado (equivalente a {new: true})
        .single();
    if (error)
        throw error;
    return responseUpdate;
};
exports.updateProduct = updateProduct;
// 2. DELETE: Borra por ID
const deleteProduct = async (id) => {
    const { data: responsedelete, error } = await database_1.supabase
        .from('atributos')
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
        .from('atributos')
        .select('*')
        .ilike('nombre', `%${query}%`);
    if (error)
        throw error;
    return responseSearch;
};
exports.searchProducts = searchProducts;
//# sourceMappingURL=atributtes.supabase.js.map