"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UbicacionSchema = new mongoose_1.Schema({
    direccion: { type: String, required: true },
    telefono: { type: String, required: false },
    barrio: { type: String, required: true },
    partido: { type: String, required: true },
    region: { type: String, required: true },
    provincia: { type: String, required: true },
    CP: { type: String, required: true },
}, { _id: false });
//# sourceMappingURL=schemas.js.map