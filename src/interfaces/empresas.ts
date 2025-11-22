import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';
import * as mongodb from "mongodb";

// Interfaz para los coeficientes de la empresa
export interface Coeficientes {
  coeficiente?: number;
  mono?: number[];         // Arreglo de valores para "mono"
  monotributo?: number[];  // Arreglo de valores para "monotributo"
}

// Interfaz principal para la empresa
export interface Empresa {
  _id?: mongodb.ObjectId;   // ID de la empresa en MongoDB
  item_id?: number;         // ID del ítem
  name?: string;            // Nombre de la empresa
  images?: string[];        // Arreglo de imágenes
  sigla?: string;           // Sigla de la empresa
  lineas?: string[];        // Arreglo de líneas de productos
  factores?: Coeficientes;  // Detalles sobre los coeficientes y otros factores
}
