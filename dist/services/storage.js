"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUpload = void 0;
const storage_1 = __importDefault(require("../models/storage"));
const registerUpload = async ({ filename, idUser, path }) => {
    const responseInsert = await storage_1.default.create({ filename, idUser, path });
    return responseInsert;
};
exports.registerUpload = registerUpload;
//# sourceMappingURL=storage.js.map