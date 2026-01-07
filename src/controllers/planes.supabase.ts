import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { 
  createPlan, 
  getPlanesConTodo, 
  getProduct, 
  updateProduct, 
  deleteProduct, 
  searchProducts 
} from "../services/planes.supabase";

const getItems = async (req: Request, res: Response) => {
  try {
    const response = await getPlanesConTodo();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_PLANES');
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

const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await updateProduct(id, req.body);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE');
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

export { getItems, getItemById, createItem, updateItem, deleteItem, searchItem };