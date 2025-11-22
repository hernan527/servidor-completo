import * as mongodb from 'mongodb';
import { Imagen, Attribute } from './interfaces';
import { Clinicas } from './clinicas'; // Importamos la interfaz Clinicas completa

export interface Planes {
    _id?: mongodb.ObjectId;
    item_id?: string;
    empresa?: string;
    sigla?: string; 

    // Datos principales
    price: number; 
    precio: number;
    rating: number; 
    category?: 'inferior' | 'intermedio' | 'superior';
    tags?: string[];
    name?: string;

    // Atributos binarios (Booleanos)
    Cirugia_Estetica: boolean;
    Cobertura_Nacional: boolean;
    Habitacion_Individual: boolean;
    Ortodoncia_Adultos: boolean;
    PMO_Solo_por_Aportes: boolean;
    Sin_Copagos: boolean;
    copagos: boolean;
    hijosSolos: boolean;

    // Campos numéricos adicionales
    raiting: number; 
    valueSlide3: number;
    valueSlide4: number;
    aporteOS: number;
    
    // Anidación de Sub-documentos (deben ser arrays si el Schema los trata como [Schema])
    // images en el Schema es un array de ImageSchema
    images: Imagen[];
    
    // attributes en el Schema es un array de Mixed (pero si usas Attribute, es mejor tiparlo)
    attributes: Attribute[]; 

    // clinicas en el Schema es un array de ClinicaSchema
    clinicas: Clinicas[];

    // Otros arrays de strings
    folletos?: string[];
    beneficios?: string[];
    cartillas?: string[]; // Si el plan tuviera cartillas directamente (lo agrego por si acaso)
}