import { Schema, model, Document } from "mongoose";

// Define el tipo para tu documento de cotización
interface CotizacionDocument extends Document {
    empresas: any[];
    contacto: any[];
    cotizacion: Record<string, any>;
    fecha: Date;
    // Otros campos que puedas necesitar
}

// Define el schema para tu documento de cotización
const cotizacionSchema = new Schema<CotizacionDocument>({
    empresas: {
            type: Schema.Types.Mixed, // Campo de tipo Mixed para permitir cualquier tipo de dato
            required: true,
        },
        contacto: {
            type: Schema.Types.Mixed, // Campo de tipo Mixed para permitir cualquier tipo de dato
            required: true,
        },
        cotizacion: {
            type: Schema.Types.Mixed, // Campo de tipo Mixed para permitir cualquier tipo de dato
            required: true,
        },
        fecha: {
            type: Date,
            default: Date.now,
        },
        // Otros campos que puedas necesitar
    });

const CotizacionModel = model<CotizacionDocument>("Cotizacion", cotizacionSchema);

export default CotizacionModel;

