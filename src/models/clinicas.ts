import { Clinicas } from "../interfaces/clinicas";
import mongoose, { Schema, Model } from 'mongoose';
import { UbicacionSchema } from "./schemas";
// ----------------------------------------------------
// 1. Sub-Schema: Cobertura (Necesario para ClinicaSchema)
// ----------------------------------------------------

// Este esquema es para los children de Cobertura
const CoberturaChildSchema: Schema = new Schema({
    key: { type: String, required: true },
    label: { type: String, required: true },
    id: { type: String }, 
}, { _id: true });

// Este es el esquema principal de Cobertura
const CoberturaSchema: Schema = new Schema({
    key: { type: String, required: true },
    label: { type: String, required: true },
    children: { type: [CoberturaChildSchema], default: [] }, 
}, { _id: true });



// ----------------------------------------------------
// 3. Sub-Schema: Imagen (Ajustado para ser un subdocumento)
// ----------------------------------------------------
const ImagenSchema: Schema = new Schema({
    id: { type: String, required: true },
    descripcion: { type: String, required: true },
    empresa: { type: String, required: true },
    url: { type: String, required: true },
}, { _id: false });


// ----------------------------------------------------
// 4. Definición y EXPORTACIÓN Nombrada del Schema Principal
// ----------------------------------------------------
export const ClinicaSchema: Schema = new Schema({
    item_id: { type: String },
    nombre: { type: String },
    entity: { type: String }, 
    cartillas: { type: [String], default: [] }, 
    tipo: { type: String }, 
    especialidades: { type: [String], default: [] }, 
    url: { type: String }, 
    rating: { type: Number, default: 0 }, 
    select: { type: Boolean, default: false }, 
    
    // ANIDACIÓN CLAVE: Usamos el esquema de sub-documento
    ubicacion: { type: [UbicacionSchema], default: [] }, 
// ...
    
    // El campo 'imagen' ahora es un objeto simple, no un array de strings
    imagen: { type: ImagenSchema, default: {} }, 
    
    // Anidación de Coberturas
    coberturas: { type: [CoberturaSchema], default: [] }, 
    
    // NOTA: Los campos antiguos como 'direccion', 'telefono', 'barrio', 
    // 'partido', 'region', 'provincia', y 'CP' han sido ELIMINADOS de este nivel 
    // y MOVILIZADOS al UbicacionSchema para evitar duplicidad.

}, { collection: 'clinicas' });


// 2. Exportación por Defecto: Necesaria para el CARGADOR de modelos en 'index.ts'
const ClinicasModel: Model<any> = mongoose.model('Clinica', ClinicaSchema);
export default ClinicasModel;