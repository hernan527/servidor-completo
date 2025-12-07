"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItem = exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemById = exports.getItems = void 0;
const mongodb = __importStar(require("mongodb"));
const error_handle_1 = require("../utils/error.handle");
const items_1 = require("../services/items");
const getItems = async (req, res) => {
    try {
        const response = await (0, items_1.getProducts)();
        res.status(200).send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_todos');
    }
};
exports.getItems = getItems;
const getItemById = async ({ params }, res, schema) => {
    try {
        const { id } = params;
        const response = await (0, items_1.getProduct)(id);
        const data = response ? response : "NOT_FOUND";
        res.status(200).send(data);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_GET_uno');
    }
};
exports.getItemById = getItemById;
const createItem = async ({ body }, res) => {
    try {
        if (body._id) {
            body._id = new mongodb.ObjectId(body._id);
        }
        const responseItem = await (0, items_1.createProduct)(body);
        res.send(responseItem);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE');
    }
};
exports.createItem = createItem;
const updateItem = async ({ params, body }, res) => {
    try {
        const { id } = params;
        const response = await (0, items_1.updateProduct)(id, body);
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
        const response = await (0, items_1.deleteProduct)(id);
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
        const response = await (0, items_1.searchProducts)(query);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_SEARCH');
    }
    ;
};
exports.searchItem = searchItem;
//# sourceMappingURL=items.js.map