"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlanes = exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
exports.obtenerEmpresasDisponibles = obtenerEmpresasDisponibles;
const empresas_1 = __importDefault(require("./../models/empresas"));
const planes_1 = __importDefault(require("./../models/planes"));
const planes_2 = require("./planes");
async function obtenerEmpresasDisponibles() {
    const empresas = await planes_1.default.distinct('empresa');
    return empresas;
}
const createProduct = async (item) => {
    const responseCreate = await empresas_1.default.create(item);
    return responseCreate;
};
exports.createProduct = createProduct;
const getProducts = async () => {
    const responseGet = await empresas_1.default.find({});
    return responseGet;
};
exports.getProducts = getProducts;
const getProduct = async (id) => {
    const responseGetOne = await empresas_1.default.findOne({ _id: id });
    // console.log( ' responseGetOne : ', id)
    return responseGetOne;
};
exports.getProduct = getProduct;
const updateProduct = async (id, data) => {
    const responseUpdate = await empresas_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const responsedelete = await empresas_1.default.deleteOne({ _id: id });
    return responsedelete;
};
exports.deleteProduct = deleteProduct;
const searchProducts = async (query) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await empresas_1.default.find({
        concept: { $regex: query, $options: 'i' },
    });
    return responseSearch;
};
exports.searchProducts = searchProducts;
const getPlanes = async () => {
    const responseGet = await (0, planes_2.obtenerPlanesConClinicas)();
    return responseGet;
};
exports.getPlanes = getPlanes;
//# sourceMappingURL=empresas.js.map