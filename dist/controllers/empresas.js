"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const empresas_1 = require("../services/empresas");
const getItems = async (req, res) => {
    try {
        const response = await (0, empresas_1.getProducts)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_CLINICAS');
    }
};
exports.getItems = getItems;
const getItemById = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, empresas_1.getProduct)(id);
        const data = response ? response : "NOT_FOUND";
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_uno');
    }
};
exports.getItemById = getItemById;
const createItem = async (req, res) => {
    try {
        const responseItem = await (0, empresas_1.createProduct)(req);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_CLINICA');
    }
};
exports.createItem = createItem;
const updateItem = async ({ params, body }, res) => {
    try {
        const { id } = params;
        const response = await (0, empresas_1.updateProduct)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE');
    }
};
exports.updateItem = updateItem;
const deleteItem = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, empresas_1.deleteProduct)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE');
    }
    ;
};
exports.deleteItem = deleteItem;
const searchItem = async ({ params }, res) => {
    try {
        const { query, concept } = params;
        // console.log("query")
        // console.log(query)
        // console.log("concept")
        // console.log(concept)
        const response = await (0, empresas_1.searchProducts)(query);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SEARCH');
    }
    ;
};
exports.searchItem = searchItem;
//# sourceMappingURL=empresas.js.map