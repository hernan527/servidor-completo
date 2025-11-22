import { Request, Response } from 'express';
import { collections } from '../config/database';
import { handleHttp } from "../utils/error.handle";

import * as mongodb from "mongodb";
import {  createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts} from "../services/clinicas";




const  getItems = async (req: Request, res: Response) => {
  // console.log('hola getItems clinicas')
  try {
    const  response = await getProducts();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_CLINICAS')
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
    const responseItem = await createProduct(req);
        res.send(responseItem);

  } catch (e) {
    handleHttp(res,'ERROR_CREATE_CLINICA')
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
    console.log("query")

    console.log(query)
    console.log("concept")
    console.log(concept)


    const response = await searchProducts(query);
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_SEARCH')
};
};

export { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  }