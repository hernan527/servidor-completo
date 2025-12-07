"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCar = exports.getCars = exports.insertCar = void 0;
const item_1 = __importDefault(require("../models/item"));
const insertCar = async (item) => {
    const responseInsert = await item_1.default.create(item);
    return responseInsert;
};
exports.insertCar = insertCar;
const getCars = async () => {
    const responseGet = await item_1.default.find({});
    return responseGet;
};
exports.getCars = getCars;
const getCar = async (id) => {
    const responseGetOne = await item_1.default.findOne({ _id: id });
    return responseGetOne;
};
exports.getCar = getCar;
const updateCar = async (id, data) => {
    const responseUpdate = await item_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updateCar = updateCar;
const deleteCar = async (id) => {
    const responsedelete = await item_1.default.deleteOne({ _id: id });
    return responsedelete;
};
exports.deleteCar = deleteCar;
//# sourceMappingURL=item.js.map