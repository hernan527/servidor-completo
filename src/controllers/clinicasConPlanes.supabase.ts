import { Request, Response } from 'express';
import { collections } from '../config/database';
import { handleHttp } from "../utils/error.handle";
import { createClinicaConPlanes, getJerarquiaData, updateClinicaFull, deleteClinicaFull } from "../services/clinicasConPlanes.supabase";

// ... imports ...

const updateItemFull = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { clinicaData, planIds } = req.body;
    const response = await updateClinicaFull(id, clinicaData, planIds);
    res.status(200).json(response);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_CLINICA_FULL');
  }
};

const deleteItemFull = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteClinicaFull(id);
    res.status(200).json(response);
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_CLINICA_FULL');
  }
};
const createItemFull = async (req: Request, res: Response) => {
  console.log("📥 BACKEND: Body recibido:", req.body);
  try {
    const { clinicaData, planIds } = req.body; 
    
    console.log("🧪 BACKEND: clinicaData extraído:", clinicaData);
    console.log("🧪 BACKEND: planIds extraído:", planIds);

    const response = await createClinicaConPlanes(clinicaData, planIds);
    res.status(201).json(response);
  } catch (e: any) {
    console.error("💥 BACKEND: Fallo en createItemFull:", e); // Esto imprimirá el error real de Supabase
    handleHttp(res, 'ERROR_CREATE_CLINICA_FULL');
  }
};
// Nuevo Service para el Admin de Clínicas
// En clinicasConPlanes.supabase.ts (Controlador)
// controllers/clinicasConPlanes.supabase.ts

const getJerarquia = async (req: Request, res: Response) => {
  try {
    const response = await getJerarquiaData(); 
    
    // Si no hay datos, enviamos un array vacío, pero que es JSON válido []
    if (!response) {
      return res.status(200).json([]); 
    }

    res.status(200).json(response);
  } catch (e) {
    // En lugar de enviar texto, enviamos un objeto de error
    res.status(500).json({ error: 'ERROR_GET_JERARQUIA' });
  }
};

export { createItemFull, getJerarquia, updateItemFull,  deleteItemFull};
