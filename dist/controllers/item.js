"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.postItem = exports.updateItem = exports.getItems = exports.getItem = void 0;
const error_handle_1 = require("../utils/error.handle");
const item_1 = require("../services/item");
const getItems = async (req, res) => {
    try {
        const response = await (0, item_1.getCars)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEMS');
    }
};
exports.getItems = getItems;
const getItem = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, item_1.getCar)(id);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_ITEM');
    }
};
exports.getItem = getItem;
const updateItem = async ({ params, body }, res) => {
    try {
        const { id } = params;
        const response = await (0, item_1.updateCar)(id, body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_UPDATE_ITEM');
    }
};
exports.updateItem = updateItem;
const postItem = async ({ body }, res) => {
    try {
        const responseItem = await (0, item_1.insertCar)(body);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_POST_ITEM', e);
    }
};
exports.postItem = postItem;
const deleteItem = async ({ params }, res) => {
    try {
        const { id } = params;
        const response = await (0, item_1.deleteCar)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_DELETE_ITEM');
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=item.js.map