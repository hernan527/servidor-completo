"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StorageSchema = new mongoose_1.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const StorageModel = (0, mongoose_1.model)('storage', StorageSchema);
exports.default = StorageModel;
//# sourceMappingURL=storage.js.map