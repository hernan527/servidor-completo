"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = void 0;
const item_1 = __importDefault(require("../models/item"));
const getOrders = async () => {
    const responseInsert = await item_1.default.find({});
    return responseInsert;
};
exports.getOrders = getOrders;
//# sourceMappingURL=order.js.map