import { Request, Response } from 'express';
import { ParamsDictionary  } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { collections } from '../config/database';
import { Precios } from "../interfaces/precios";
import PreciosModel from '../models/precios'; 


  const  getPrecios = async () => {
  const  precios = await PreciosModel.find({});
    return precios;
  };


const getPrecioById = async (id: string) => {
const precio = await PreciosModel.findOne({ _id: id });
return precio;
  };


const getPrecioByParam = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, id: string)  => {
const precio = await collections.precios?.find({ _id: { $regex: id } }).toArray();
return precio;
  };


export { getPrecios, getPrecioById, getPrecioByParam };

const createProduct = async (item: any) => {
  const responseCreate = await PreciosModel.create(item)
  return responseCreate;
};

const getProducts = async () => {
  const responseGet = await PreciosModel.find({});
  return responseGet
};

const getProduct = async (id: string) => {
 

  
  const responseGetOne = await PreciosModel.findOne({_id:id})
  // console.log( ' responseGetOne : ', id)
  // console.log( ' responseGetOne : ', responseGetOne)



  return responseGetOne && responseGetOne.toObject();
};

const updateProduct = async (id: string, data: any) => {
  const responseUpdate = await PreciosModel.findOneAndUpdate({_id:id},data,{new: true})
  return responseUpdate
};

const deleteProduct = async (id: string) => {
  const responsedelete = await PreciosModel.deleteOne({_id:id})
  return responsedelete
};

const searchProducts = async (query: string) => {
  // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
  const responseSearch = await PreciosModel.find({
      concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
  })
  return responseSearch
};


export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts};
