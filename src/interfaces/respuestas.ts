export interface ICotizacionMaestra {
    _id: number;           // Tu ID numérico de la tabla
    group: string;
    edad_1: number;
    edad_2?: number;       // Opcional por si no hay pareja
    tipo: string;          // 'P' (Particular), 'D' (Desregulado), etc.
    hijos: number;
    respuesta: any;        // Aquí va el objeto con todos los precios de las prepagas
    updated_at: Date;
}