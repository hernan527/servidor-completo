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
exports.router = void 0;
const express_1 = require("express");
const express = __importStar(require("express"));
const empresas_1 = require("../controllers/empresas");
const router = (0, express_1.Router)();
exports.router = router;
router.use(express.json());
router.get('/', (req, res) => { (0, empresas_1.getItems)(req, res); });
router.get('/:id', (req, res) => { (0, empresas_1.getItemById)(req, res); });
router.post('/', (req, res) => { (0, empresas_1.createItem)(req, res); });
router.put('/:id', (req, res) => { (0, empresas_1.updateItem)(req, res); });
router.delete('/:id', (req, res) => { (0, empresas_1.deleteItem)(req, res); });
router.get('/search', (req, res) => {
    (0, empresas_1.searchItem)(req, res);
});
//# sourceMappingURL=empresas.js.map