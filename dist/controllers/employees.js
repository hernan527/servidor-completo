"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const error_handle_1 = require("../utils/error.handle");
const employees_1 = require("../services/employees");
const getItems = async (req, res) => {
    try {
        const response = await (0, employees_1.getEmployees)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_POST_ITEM', e);
    }
};
exports.getItems = getItems;
const getItemById = async (req, res) => {
    try {
        const response = await (0, employees_1.getEmployeeById)(req, res);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_POST_ITEM', e);
    }
};
exports.getItemById = getItemById;
const createItem = async (req, res) => {
    try {
        const response = await (0, employees_1.createEmployee)(req, res);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_POST_ITEM', e);
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const response = await (0, employees_1.updateEmployee)(req, res);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_POST_ITEM', e);
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const response = await (0, employees_1.deleteEmployee)(req, res);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_POST_ITEM', e);
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=employees.js.map