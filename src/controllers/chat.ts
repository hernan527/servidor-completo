import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";

import {  getProductsIA, getPlanesIA, organizarClinicasPorRegiones} from "../services/chat";

const  getClinicasPorRegionesIA = async (req: Request, res: Response) => {
  // console.log('hola getItems clinicas')
  try {
    const  response = await organizarClinicasPorRegiones();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_CLINICAS')
  }
};


const  getItemsIA = async (req: Request, res: Response) => {
  // console.log('hola getItems clinicas')
  try {
    const  response = await getProductsIA();
    res.status(200).send(response);
  } catch (e) {
    handleHttp(res,'ERROR_GET_CLINICAS')
  }
};

const  getItemsPlanesIA = async (req: Request, res: Response) => {
    // console.log('hola getItems clinicas')
    try {
      const  response = await getPlanesIA();
      res.status(200).send(response);
    } catch (e) {
      handleHttp(res,'ERROR_GET_CLINICAS')
    }
  };


export { getItemsIA, getItemsPlanesIA,getClinicasPorRegionesIA }