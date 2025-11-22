import { Schema, model, Document } from "mongoose";

// Define el tipo para tu documento de cotización
export interface Cotizaciones extends Document {
    empresas: any[];
    contacto: any[];
    cotizacion: Record<string, any>;
    fecha: Date;
    // Otros campos que puedas necesitar
}
