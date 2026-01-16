import { Schema, model, models } from 'mongoose';
import { Precios } from "../interfaces/precios";

const CotizacionFinalSchema = new Schema({
    _id: { type: Number, required: true }, 
    group: { type: Schema.Types.Mixed },
    edad_1: { type: Number },
    edad_2: { type: Number },
    hijos: { type: Number },
    tipo: { type: String },
    respuesta: { type: Schema.Types.Mixed, default: null },
    updated_at: { type: Date, default: Date.now }
}, { 
    versionKey: false, 
    strict: false 
});

// Forzamos el nombre de la colección a 'cotizaciones_finales'
export const CotizacionFinal = models.CotizacionFinal || model('CotizacionFinal', CotizacionFinalSchema, 'cotizaciones_finales');

