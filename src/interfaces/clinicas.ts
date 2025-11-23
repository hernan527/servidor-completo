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
    
    // *** CORRECCIÓN CLAVE ***
    // Ahora 'ubicacion' es un ARRAY de objetos Ubicacion
    ubicacion: Ubicacion[]; 
    
    url: string;
    imagen: Imagen; // Objeto anidado
    tipo: string;
    especialidades: string[];
    rating: number;
    select: boolean;
}

// Este tipo es un objeto donde las claves son las regiones (string) y los valores son arrays de objetos.
export interface ClinicasAgrupadas {
    [region: string]: any[]; 
}