"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const cotizaciones_1 = require("../services/cotizaciones");
const cotizaciones_2 = __importDefault(require("../models/cotizaciones"));
const getItems = async (req, res) => {
    // console.log('hola getItems clinicas')
    try {
        const response = await (0, cotizaciones_1.getCotizaciones)();
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
        const response = await (0, cotizaciones_1.getCotizacion)(id);
        const data = response ? response : "NOT_FOUND";
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_uno');
    }
};
exports.getItemById = getItemById;
// Ejemplo de controlador para manejar la creación de cotizaciones
const createItem = async (req, res) => {
    try {
        // Extraer las propiedades necesarias del body de la solicitud
        const { empresas, contacto, cotizacion } = req.body;
        // Crear una nueva instancia de CotizacionesModel utilizando las propiedades extraídas
        const nuevaCotizacion = new cotizaciones_2.default({ empresas, contacto, cotizacion });
        // Guardar la cotización en la base de datos
        const cotizacionGuardada = await nuevaCotizacion.save();
        // Enviar una respuesta de éxito con la cotización guardada
        res.status(201).json(cotizacionGuardada);
    }
    catch (error) {
        // Manejar errores y enviar una respuesta de error
        console.error("Error al crear la cotización:", error);
        res.status(500).json({ mensaje: "Error al crear la cotización" });
    }
};
exports.createItem = createItem;
const updateItem = async ({ params, body }, res) => {
    try {
        const { id } = params;
        const response = await (0, cotizaciones_1.updateCotizacion)(id, body);
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
        const response = await (0, cotizaciones_1.deleteCotizacion)(id);
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
        const response = await (0, cotizaciones_1.searchCotizaciones)(query);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SEARCH');
    }
    ;
};
exports.searchItem = searchItem;
//# sourceMappingURL=cotizaciones.js.map