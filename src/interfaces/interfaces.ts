export interface Imagen {
    url: string;
    descripcion: string;
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
  
  export interface Content {
    text: string;
    descripcion: string;
  }