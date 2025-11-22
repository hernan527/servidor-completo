
import { Imagen as MiImagen } from './interfaces';
import * as mongodb from "mongodb";


export interface Publicaciones {
  name?: string;
  ubicacion?: string;
  sucursales?: string[];
  telefono?: string;
  imagen?: MiImagen[];
  _id?: mongodb.ObjectId;

}
