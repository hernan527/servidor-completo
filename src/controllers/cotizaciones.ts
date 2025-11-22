import { Request, Response } from 'express';
import { collections } from '../config/database';
import { handleHttp } from "../utils/error.handle";

import * as mongodb from "mongodb";
import { createCotizacion, getCotizaciones, getCotizacion, updateCotizacion, deleteCotizacion, searchCotizaciones} from "../services/cotizaciones";
import { Cotizaciones } from '../interfaces/cotizaciones';
import CotizacionesModel from '../models/cotizaciones';




const  getItems = async (req: Request, res: Response) => {
  // console.log('hola getItems clinicas')
  try {
    const  response = await getCotizaciones();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_CLINICAS')
  }
};

const  getItemById = async ({ params }:Request,res:Response) => {
  try {
    const { id } = params
    const  response = await getCotizacion(id);
    const data = response ? response : "NOT_FOUND"
    res.status(200).send(data);
  }  catch (e) {
    handleHttp(res,'ERROR_GET_uno')
  }
};
// Ejemplo de controlador para manejar la creación de cotizaciones
const createItem = async (req: Request, res: Response) => {
    try {
        // Extraer las propiedades necesarias del body de la solicitud
        const { empresas, contacto, cotizacion }: Cotizaciones = req.body;

        // Crear una nueva instancia de CotizacionesModel utilizando las propiedades extraídas
        const nuevaCotizacion = new CotizacionesModel({ empresas, contacto, cotizacion });

        // Guardar la cotización en la base de datos
        const cotizacionGuardada = await nuevaCotizacion.save();

        // Enviar una respuesta de éxito con la cotización guardada
        res.status(201).json(cotizacionGuardada);
    } catch (error) {
        // Manejar errores y enviar una respuesta de error
        console.error("Error al crear la cotización:", error);
        res.status(500).json({ mensaje: "Error al crear la cotización" });
    }
}


const updateItem = async ({ params, body }: Request, res: Response) => {
  try {
    const { id }  = params;
  const response = await updateCotizacion(  id, body );
  res.send( response )
} catch (e) {
  handleHttp(res,'ERROR_UPDATE')
}
};

const  deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
   const response = await deleteCotizacion(id);
   res.send(response)
 } catch (e) {
   handleHttp(res,'ERROR_DELETE')
};
}


const searchItem = async ({ params }: Request, res: Response) => {
  try {
    const { query, concept } = params;
    // console.log("query")

    // console.log(query)
    // console.log("concept")
    // console.log(concept)


    const response = await searchCotizaciones(query);
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_SEARCH')
};
};

export { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  }