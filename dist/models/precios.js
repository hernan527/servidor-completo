"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const precioSchema = new mongoose_1.Schema({ _id: String,
    prices: {
        type: Map,
        of: Number
    }
});
const PreciosModel = (0, mongoose_1.model)('precios', precioSchema);
exports.default = PreciosModel;
//# sourceMappingURL=precios.js.map