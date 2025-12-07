"use strict";
// src/controllers/compararclinicas.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupClinics = void 0;
// ...
const compararclinicas_1 = require("../services/compararclinicas");
// Importamos la función de consulta con un nombre claro para evitar confusión
const planes_1 = require("../services/planes");
const error_handle_1 = require("../utils/error.handle");
// src/controllers/compararclinicas.ts (Flujo Correcto)
const groupClinics = async (req, res) => {
    try {
        // 1. Obtiene los IDs del Body (SOLO EL CONTROLADOR PUEDE HACER ESTO)
        const { products: productIds } = req.body;
        if (!productIds || productIds.length === 0) {
            return res.send({});
        }
        // 2. Consulta la BD para obtener la data completa (Planes con Clínicas)
        const productsWithClinics = await (0, planes_1.getSelectedPlansData)(productIds);
        // 3. Pasa la data pura al Servicio (solo el array de objetos)
        const responseItem = await (0, compararclinicas_1.groupClinicas)(productsWithClinics);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GROUP_CLINICA');
    }
};
exports.groupClinics = groupClinics;
//# sourceMappingURL=compararclinicas.js.map