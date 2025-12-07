"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClinicasPorRegionesIA = exports.getItemsPlanesIA = exports.getItemsIA = void 0;
const error_handle_1 = require("../utils/error.handle");
const chat_1 = require("../services/chat");
const getClinicasPorRegionesIA = async (req, res) => {
    // console.log('hola getItems clinicas')
    try {
        const response = await (0, chat_1.organizarClinicasPorRegiones)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_CLINICAS');
    }
};
exports.getClinicasPorRegionesIA = getClinicasPorRegionesIA;
const getItemsIA = async (req, res) => {
    // console.log('hola getItems clinicas')
    try {
        const response = await (0, chat_1.getProductsIA)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_CLINICAS');
    }
};
exports.getItemsIA = getItemsIA;
const getItemsPlanesIA = async (req, res) => {
    // console.log('hola getItems clinicas')
    try {
        const response = await (0, chat_1.getPlanesIA)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_CLINICAS');
    }
};
exports.getItemsPlanesIA = getItemsPlanesIA;
//# sourceMappingURL=chat.js.map