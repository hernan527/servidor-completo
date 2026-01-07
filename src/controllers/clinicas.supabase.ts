import { Request, Response } from 'express';
import { collections } from '../config/database';
import { handleHttp } from "../utils/error.handle";

import * as mongodb from "mongodb";
import {  getProducts, getProduct,searchProducts} from "../services/clinicas.supabase";




const  getItems = async (req: Request, res: Response) => {
  console.log('hola getItems clinicas')
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






const searchItem = async ({ params }: Request, res: Response) => {
  try {
    const { query, concept } = params;


    const response = await searchProducts(query);
    res.send(response);
  } catch (e) {
    handleHttp(res,'ERROR_SEARCH')
};
};

export { getItems, getItemById, searchItem  }