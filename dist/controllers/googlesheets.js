"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const googlesheets_1 = require("../services/googlesheets"); // Renombrar para evitar conflicto
const getItems = async (req, res) => {
    // console.log('controller')
    try {
        // La llamada al servicio es ahora limpia
        const response = await (0, googlesheets_1.getItems)();
        // El servicio ya procesó y limpió los datos, solo los devolvemos.
        // Usamos status 200 OK
        res.status(200).json({ data: response });
    }
    catch (e) {
        // La función handleHttp maneja el error y envía la respuesta HTTP
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_SHEETS_DATA', e);
    }
};
exports.getItems = getItems;
//# sourceMappingURL=googlesheets.js.map