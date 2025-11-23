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

// En tu archivo: src/interfaces/content.ts (o similar)

export interface Content {
    /**
     * Identificador opcional del bloque de contenido. Útil para reordenar en el frontend.
     */
    id?: string;

    /**
     * Tipo de bloque de contenido (ej: 'paragraph', 'heading', 'image', 'list', 'quote', 'code').
     * Esto es CRUCIAL para que el frontend sepa cómo renderizar el campo 'value'.
     */
    type: 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | string;

    /**
     * El contenido real del bloque.
     * Si type es 'paragraph', es texto.
     * Si type es 'heading', es texto.
     * Si type es 'image', puede ser el ID de la imagen (o el objeto imagen si no está en el array 'imagen' del Post).
     */
    value?: string;

    /**
     * Nivel del encabezado, si el 'type' es 'heading' (ej: 1 para H1, 2 para H2).
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    
    /**
     * Descripción opcional o pie de foto.
     */
    caption?: string;

    /**
     * Atributos adicionales específicos del bloque (ej: alineación, estilo).
     */
    attributes?: { [key: string]: any };

    /**
     * Opcional: Si el bloque contiene una lista, este array puede contener los ítems.
     * (Aunque generalmente se resuelve usando 'value' como HTML o Markdown).
     */
    items?: string[]; 
}