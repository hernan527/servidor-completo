import * as mongodb from "mongodb";

// Interfaces para Sub-documentos
export interface Imagen {
    id: string;
    descripcion: string;
    empresa: string,
    url: string;
}
 
export interface Ubicacion {
    direccion: string;
    telefono?: string; // Opcional
    barrio: string;
    partido: string;
    region: string;
    provincia: string;
    CP: string;
}

export interface CoberturaInterface {
    _id?: string;
    key: string;
    label: string;
    children?: {
        _id?: string;
        key: string;
        label: string;
        id?: string;
    }[]; 
}

export interface Attribute {
    id: string | null;
    name: string;
    value_id: string | null;
    value_name: string;
    attribute_group_id: string | null;
    attribute_group_name: string;
    value_type: string | null;
}