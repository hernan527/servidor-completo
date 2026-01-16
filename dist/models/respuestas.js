"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CotizacionFinal = void 0;
const mongoose_1 = require("mongoose");
const CotizacionFinalSchema = new mongoose_1.Schema({
    _id: { type: Number, required: true },
    group: { type: mongoose_1.Schema.Types.Mixed },
    edad_1: { type: Number },
    edad_2: { type: Number },
    hijos: { type: Number },
    tipo: { type: String },
    respuesta: { type: mongoose_1.Schema.Types.Mixed, default: null },
    updated_at: { type: Date, default: Date.now }
}, {
    versionKey: false,
    strict: false
});
// Forzamos el nombre de la colección a 'cotizaciones_finales'
exports.CotizacionFinal = mongoose_1.models.CotizacionFinal || (0, mongoose_1.model)('CotizacionFinal', CotizacionFinalSchema, 'cotizaciones_finales');
//# sourceMappingURL=respuestas.js.map