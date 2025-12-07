"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCotizaciones = exports.deleteCotizacion = exports.updateCotizacion = exports.getCotizacion = exports.getCotizaciones = exports.createCotizacion = void 0;
const item_1 = __importDefault(require("../models/item"));
const createCotizacion = async (item) => {
    const responseInsert = await item_1.default.create(item);
    return responseInsert;
};
exports.createCotizacion = createCotizacion;
const getCotizaciones = async () => {
    const responseGet = await item_1.default.find({});
    return responseGet;
};
exports.getCotizaciones = getCotizaciones;
const getCotizacion = async (id) => {
    const responseGetOne = await item_1.default.findOne({ _id: id });
    return responseGetOne;
};
exports.getCotizacion = getCotizacion;
const updateCotizacion = async (id, data) => {
    const responseUpdate = await item_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updateCotizacion = updateCotizacion;
const deleteCotizacion = async (id) => {
    const responsedelete = await item_1.default.deleteOne({ _id: id });
    return responsedelete;
};
exports.deleteCotizacion = deleteCotizacion;
const searchCotizaciones = async (query) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await item_1.default.find({
        concept: { $regex: query, $options: 'i' },
    });
    return responseSearch;
};
exports.searchCotizaciones = searchCotizaciones;
//# sourceMappingURL=cotizaciones.js.map