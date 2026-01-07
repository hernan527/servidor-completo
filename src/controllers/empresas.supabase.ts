import { Request, Response } from 'express';
import { collections } from '../config/database';
import { handleHttp } from "../utils/error.handle";

import * as mongodb from "mongodb";
import {  createEmpresa, getCompanies, getProduct, updateProduct, deleteProduct, searchProducts} from "../services/empresas.supabase";




const  getItems = async (req: Request, res: Response) => {
  // console.log('hola getItems EMPRESASs')
  try {
    const  response = await getCompanies();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GETEMPRESAS')
  }
};

const  getItemById = async ({ params }:Request,res:Response) => {
  try {
    const { id } = params
    const  response = await getProduct(id);
    const data = response ? response : "NOT_FOUND"
    res.status(200).send(data);
  }  catch (e) {
    handleHttp(res,'ERROR_GET_uno')
  }
};

const  createItem = async (req: Request, res: Response) => {
  try {
    const responseItem = await createEmpresa(req.body);
        res.send(responseItem);

  } catch (e) {
    handleHttp(res,'ERROR_CREATE_EMPRESAS')
  }
};
 
const updateItem = async ({ params, body }: Request, res: Response) => {
  try {
    const { id }  = params;
  const response = await updateProduct(  id, body );
  res.send( response )
} catch (e) {
  handleHttp(res,'ERROR_UPDATE')
}
};

const  deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
   const response = await deleteProduct(id);
   res.send(response)
 } catch (e) {
   handleHttp(res,'ERROR_DELETE')
};
}


const searchItem = async ({ params }: Request, res: Response) => {
  try {
    const { query, concept } = params;


    const response = await searchProducts(query);
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_SEARCH')
};
};

export { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  }