import { Clinicas } from "../interfaces/clinicas";
import mongoose, { Schema, Model } from 'mongoose';

const CoberturaChildSchema = new mongoose.Schema({
    key: String,
    label: String,
    id: String, // 'id' es opcional en algunos niveles
}, { _id: true }); // Mantenemos _id: true ya que tus documentos lo tienen explícitamente

// Schema para el sub-documento de 'coberturas' (nivel principal)
const CoberturaSchema = new mongoose.Schema({
    key: String,
    label: String,
    children: [CoberturaChildSchema], // Usamos Mixed ya que 'children' es recursivo o variable
}, { _id: true });

// Esquema completo para la colección 'clinicas' (basado en tu JSON de /clinicas)
const ClinicaSchema = new mongoose.Schema({
    ubicacion: mongoose.Schema.Types.Mixed,
    imagen: [String],
    item_id: String,
    nombre: String,
    entity: String,
    direccion: String,
    telefono: String,
    barrio: String,
    partido: String,
    region: String,
    provincia: String,
    CP: String,
    url: String,
    tipo: String,
    especialidades: [String],
    cartillas: [String],
    coberturas: [CoberturaSchema], // Usamos el esquema que acabamos de definir
    rating: mongoose.Schema.Types.Mixed,
    select: mongoose.Schema.Types.Mixed,
}, { collection: 'clinicas' });

// 1. Exportación Nombrada: Necesaria para la ANIDACIÓN en 'planes.ts'
// <<<<<< ESTO ES LO NUEVO Y CRUCIAL >>>>>>
export { ClinicaSchema };

// 2. Exportación por Defecto: Necesaria para el CARGADOR de modelos en 'index.ts'
const ClinicasModel: Model<any> = mongoose.model('Clinica', ClinicaSchema);
export default ClinicasModel;