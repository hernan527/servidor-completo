"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const getItems = async (req, res) => {
    try {
        res.send({
            data: "ESTO SOLO LO VEN LAS PERSONAS CON SESSION /JWT",
            user: req.user,
        });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEMS');
    }
};
exports.getItems = getItems;
//# sourceMappingURL=order.js.map