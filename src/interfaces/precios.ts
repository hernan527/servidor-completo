export interface Precios {
  _id: string;
  precios: {
    [key: string]: number;
  };
  [key: string]: any; // Signatura de índice para permitir el acceso mediante una cadena
}
