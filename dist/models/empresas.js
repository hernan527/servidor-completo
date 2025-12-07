"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema para los coeficientes
const coeficientesSchema = new mongoose_1.Schema({
    coeficiente: {
        type: Number,
        required: false, // Si no es obligatorio, se puede omitir
    },
    mono: {
        type: [Number], // Arreglo de números
        required: false, // Si no es obligatorio, se puede omitir
    },
    monotributo: {
        type: [Number], // Arreglo de números
        required: false, // Si no es obligatorio, se puede omitir
    },
}, { _id: false } // No necesitamos un campo _id para este subdocumento
);
// Esquema principal para la empresa
const empresaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true, // Campo obligatorio
    },
    item_id: {
        type: Number,
        required: true, // Campo obligatorio
    },
    images: {
        type: [String], // Arreglo de strings (URLs de imágenes)
        required: false, // No es obligatorio
    },
    sigla: {
        type: String,
        required: true, // Campo obligatorio
    },
    lineas: {
        type: [String], // Arreglo de líneas (strings)
        required: false, // No es obligatorio
    },
    factores: {
        type: coeficientesSchema, // Referencia al esquema de coeficientes
        required: false, // No es obligatorio
    },
}, { timestamps: true } // Esto añadirá campos de fecha de creación y actualización automáticamente
);
// Modelo de Mongoose
const EmpresaModel = (0, mongoose_1.model)('empresas', empresaSchema);
exports.default = EmpresaModel;
//# sourceMappingURL=empresas.js.map