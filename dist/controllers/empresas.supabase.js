"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const empresas_supabase_1 = require("../services/empresas.supabase");
const getItems = async (req, res) => {
    // console.log('hola getItems EMPRESASs')
    try {
        const response = await (0, empresas_supabase_1.getCompanies)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GETEMPRESAS');
    }
};
exports.getItems = getItems;
const getItemById = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, empresas_supabase_1.getProduct)(id);
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
        const responseItem = await (0, empresas_supabase_1.createEmpresa)(req.body);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_EMPRESAS');
    }
};
exports.createItem = createItem;
const updateItem = async ({ params, body }, res) => {
    try {
        const { id } = params;
        const response = await (0, empresas_supabase_1.updateProduct)(id, body);
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
        const response = await (0, empresas_supabase_1.deleteProduct)(id);
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
        const response = await (0, empresas_supabase_1.searchProducts)(query);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SEARCH');
    }
    ;
};
exports.searchItem = searchItem;
//# sourceMappingURL=empresas.supabase.js.map