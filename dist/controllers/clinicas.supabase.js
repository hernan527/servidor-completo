"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const clinicas_supabase_1 = require("../services/clinicas.supabase");
const getItems = async (req, res) => {
    console.log('hola getItems clinicas');
    try {
        const response = await (0, clinicas_supabase_1.getProducts)();
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
        const response = await (0, clinicas_supabase_1.getProduct)(id);
        const data = response ? response : "NOT_FOUND";
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_uno');
    }
};
exports.getItemById = getItemById;
const searchItem = async ({ params }, res) => {
    try {
        const { query, concept } = params;
        const response = await (0, clinicas_supabase_1.searchProducts)(query);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SEARCH');
    }
    ;
};
exports.searchItem = searchItem;
//# sourceMappingURL=clinicas.supabase.js.map