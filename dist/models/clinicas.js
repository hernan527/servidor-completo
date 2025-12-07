"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicaSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const schemas_1 = require("./schemas");
// ----------------------------------------------------
// 1. Sub-Schema: Cobertura (Necesario para ClinicaSchema)
// ----------------------------------------------------
// Este esquema es para los children de Cobertura
const CoberturaChildSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    label: { type: String, required: true },
    id: { type: String },
}, { _id: true });
// Este es el esquema principal de Cobertura
const CoberturaSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    label: { type: String, required: true },
    children: { type: [CoberturaChildSchema], default: [] },
}, { _id: true });
// ----------------------------------------------------
// 3. Sub-Schema: Imagen (Ajustado para ser un subdocumento)
// ----------------------------------------------------
const ImagenSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    descripcion: { type: String, required: true },
    empresa: { type: String, required: true },
    url: { type: String, required: true },
}, { _id: false });
// ----------------------------------------------------
// 4. Definición y EXPORTACIÓN Nombrada del Schema Principal
// ----------------------------------------------------
exports.ClinicaSchema = new mongoose_1.Schema({
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
    ubicacion: { type: [schemas_1.UbicacionSchema], default: [] },
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
const ClinicasModel = mongoose_1.default.model('Clinica', exports.ClinicaSchema);
exports.default = ClinicasModel;
//# sourceMappingURL=clinicas.js.map