import { Ubicacion, Imagen } from './interfaces';
import * as mongodb from "mongodb";


export interface Clinicas {
  _id?: mongodb.ObjectId;
  nombre:string;
  entity:string;
  cartillas:[string];
  coberturas:[string];
  item_id:string;
  ubicacion:Ubicacion;
  url:string;
  imagen:Imagen;
  tipo:string;
  especialidades:[string];
  rating:number;
  select:boolean;
  }

  export interface Clinicas {
  _id?: mongodb.ObjectId;
  nombre:string;
  entity:string;
  cartillas:[string];
  coberturas:[string];
  item_id:string;
  ubicacion:Ubicacion;
  url:string;
  imagen:Imagen;
  tipo:string;
  especialidades:[string];
  rating:number;
  select:boolean;
  }

  