"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = exports.getPrecioByParam = exports.getPrecioById = exports.getPrecios = void 0;
const database_1 = require("../config/database");
const precios_1 = __importDefault(require("../models/precios"));
const getPrecios = async () => {
    const precios = await precios_1.default.find({});
    return precios;
};
exports.getPrecios = getPrecios;
const getPrecioById = async (id) => {
    const precio = await precios_1.default.findOne({ _id: id });
    return precio;
};
exports.getPrecioById = getPrecioById;
const getPrecioByParam = async (req, res, id) => {
    const precio = await database_1.collections.precios?.find({ _id: { $regex: id } }).toArray();
    return precio;
};
exports.getPrecioByParam = getPrecioByParam;
const createProduct = async (item) => {
    const responseCreate = await precios_1.default.create(item);
    return responseCreate;
};
exports.createProduct = createProduct;
const getProducts = async () => {
    const responseGet = await precios_1.default.find({});
    return responseGet;
};
exports.getProducts = getProducts;
const getProduct = async (id) => {
    const responseGetOne = await precios_1.default.findOne({ _id: id });
    // console.log( ' responseGetOne : ', id)
    // console.log( ' responseGetOne : ', responseGetOne)
    return responseGetOne && responseGetOne.toObject();
};
exports.getProduct = getProduct;
const updateProduct = async (id, data) => {
    const responseUpdate = await precios_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const responsedelete = await precios_1.default.deleteOne({ _id: id });
    return responsedelete;
};
exports.deleteProduct = deleteProduct;
const searchProducts = async (query) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await precios_1.default.find({
        concept: { $regex: query, $options: 'i' },
    });
    return responseSearch;
};
exports.searchProducts = searchProducts;
//# sourceMappingURL=precios.js.map