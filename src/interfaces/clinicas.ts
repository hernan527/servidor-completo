import * as mongodb from "mongodb";
import { Ubicacion, Imagen, CoberturaInterface } from './interfaces';

// ----------------------------------------------------
// Interfaz Principal: Clinicas
// ----------------------------------------------------

export interface Clinicas {
    _id?: mongodb.ObjectId;
    nombre: string;
    entity: string;
    cartillas: string[];
    coberturas: CoberturaInterface[]; 
    item_id: string;
    ubicacion: Ubicacion; // Objeto anidado
    url: string;
    imagen: Imagen; // Objeto anidado
    tipo: string;
    especialidades: string[];
    rating: number;
    select: boolean;
}