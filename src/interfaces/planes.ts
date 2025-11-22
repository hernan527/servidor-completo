import { Imagen as MiImagen } from './interfaces';
import * as mongodb from 'mongodb';

export interface Planes {
  price?: number; // o string? pero en schema usas Number → mejor number
  precio?: number;
  rating?: '1' | '2' | '3' | '4' | '5'; // o Number? ver abajo
  copagos?: boolean; // en schema es Boolean → mejor boolean
  category?: 'inferior' | 'intermedio' | 'superior';
  tags?: string[];
  hijosSolos?: boolean;
  name?: string;
  images?: string[];
  attributes?: Attribute[]; // 👈 CORRECCIÓN AQUÍ

  Cirugia_Estetica: boolean;
  Cobertura_Nacional: boolean;
  Habitacion_Individual: boolean;
  Ortodoncia_Adultos: boolean;
  PMO_Solo_por_Aportes: boolean;
  Sin_Copagos: boolean;
  
  raiting: number; 
  valueSlide3: number;
  valueSlide4: number;
  aporteOS: number;
  
  imagenes?: MiImagen;
  folletos?: string[];
  beneficios?: string[];
  clinicas?: string[];
  
  _id?: mongodb.ObjectId;
  item_id?: string;
  empresa?: string;
  sigla?: string; 
}
// interfaces/attribute.ts
export interface Attribute {
  id: string | null;
  name: string;
  value_id: string | null;
  value_name: string;
  attribute_group_id: string | null;
  attribute_group_name: string;
  value_type: string | null;
}