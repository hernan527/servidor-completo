"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cotizacionSchema = new mongoose_1.Schema();
const CotizacionModel = (0, mongoose_1.model)('cotizacion', cotizacionSchema);
exports.default = CotizacionModel;
//# sourceMappingURL=cotizacion.js.map