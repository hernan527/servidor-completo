import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { supabase } from '../config/database'; // Asegúrate de importar tu cliente
import { 
  createPlan, 
  getPlanesConTodo, 
  getProduct,  
  deleteProduct, 
  searchProducts,
  getPrestacionesMaestras,
  updatePrestacionesPlanService,
  getJerarquiaData,
  createPrestacionesMaestras
} from "../services/planes.supabase";

const getItems = async (req: Request, res: Response) => {
  try {
    const response = await getPlanesConTodo();
    console.log('hola getItems plans')
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_PLANES');
  }
};

const getPrestaciones = async (req: Request, res: Response) => {
  try {
    const response = await getPrestacionesMaestras();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_PRESTACIONES');
  }
};

const createPrestacion = async (req: Request, res: Response) => {
  try {
    // 🔍 Verificamos que el body no venga vacío
    if (!req.body.nombre) {
       return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    // Llamamos al servicio pasando el body
    const response = await createPrestacionesMaestras(req.body);
    
    // Respondemos con el objeto creado
    return res.status(201).json(response);
  } catch (e) {
    console.error("Error en controller:", e);
    return res.status(500).json({ error: "ERROR_CREATE_PRESTACION" });
  }
};


const updatePrestacionesPlan = async (req: Request, res: Response) => {
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

    const response = await updatePrestacionesPlanService(id, prestacionesArray);
    
    // IMPORTANTE: Siempre devolver un JSON para evitar el error de 'Unexpected end of JSON'
    return res.status(200).json({ success: true, data: response });
  } catch (e: any) {
    console.error("❌ Error en updatePrestacionesPlan Controller:", e.message);
    return res.status(500).json({ error: 'ERROR_UPDATE_PRESTACIONES_PLAN' });
  }
};

const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getProduct(id);
    const data = response ? response : "NOT_FOUND";
    res.status(200).send(data);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_PLAN_BY_ID');
  }
};

const createItem = async (req: Request, res: Response) => {
  try {
    // IMPORTANTE: Asegúrate de que req.body tenga la estructura que espera tu service
    const responseItem = await createPlan(req.body);
    
    // Si el servicio devuelve un error de Supabase, lanzamos el error para que handleHttp lo capture
    if (!responseItem) throw new Error("No se pudo crear el plan");
    
    res.status(201).send(responseItem);
  } catch (e) {
    console.error("Error detallado en createItem:", e); // Esto lo verás en la terminal de VS Code
    handleHttp(res, 'ERROR_CREATE_PLAN');
  }
};
// Este es el controlador que Express llama
const updateItem = async (req: Request, res: Response) => {
  try {
    // Aquí sacamos el ID de los parámetros de la URL
    const { id } = req.params; 
    
    // Aquí ejecutamos la lógica que antes tenías en updateProduct
    // Pero la hacemos aquí mismo o llamamos a una función que NO sea un controlador
    console.log("=== DEBUG GUARDADO PLAN ===");
    console.log("ID RECIBIDO:", id);

    const { data, error } = await supabase
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
  await updatePrestacionesPlanService(id, req.body.prestaciones); // <-- EL AWAIT ES OBLIGATORIO
}
  

    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};
const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteProduct(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE');
  }
};

const searchItem = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const response = await searchProducts(query);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_SEARCH');
  }
};


/**
 * OBTENER JERARQUÍA (Para el formulario del Frontend)
 * Trae Empresas -> Líneas -> Planes
 */
const getJerarquia = async (req: Request, res: Response) => {
  try {
    const response = await getJerarquiaData(); 
    
    if (!response) {
      return res.status(200).json([]); 
    }

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'ERROR_GET_JERARQUIA' });
  }
};

export { getItems, getItemById, createItem, updateItem, deleteItem, searchItem, getPrestaciones, updatePrestacionesPlan, getJerarquia, createPrestacion };