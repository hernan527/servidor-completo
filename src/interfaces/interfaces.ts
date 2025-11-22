import * as mongodb from "mongodb";

// Interfaces para Sub-documentos
export interface Imagen {
    id: string;
    descripcion: string;
    empresa: string,
    url: string;
}
 
export interface Ubicacion {
    calle_y_numero: string;
    telefono?: string;
    barrio: string;
    partido: string;
    region: string;
    provincia: string;
    CP: string;
}

export interface CoberturaInterface {
    _id?: mongodb.ObjectId;
    key: string;
    label: string;
    children?: {
        _id?: mongodb.ObjectId;
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