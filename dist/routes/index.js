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
const fs_1 = require("fs");
const PATH_ROUTER = `${__dirname}`;
const router = (0, express_1.Router)();
exports.router = router;
const cleanFileName = (filename) => {
    const file = filename.split('.').shift();
    return file;
};
const importModule = async (filename) => {
    const cleanName = cleanFileName(filename);
    if (cleanName !== 'index') {
        try {
            const moduleRouter = await Promise.resolve(`${`./${cleanName}`}`).then(s => __importStar(require(s)));
            console.log(`Se está cargando la ruta.../${cleanName}`);
            router.use(`/${cleanName}`, moduleRouter.router);
        }
        catch (error) {
            // Manejo del error: verificación del tipo de error
            if (error instanceof Error) {
                console.error(`Error loading route.../${cleanName}: ${error.message}`);
            }
            else {
                console.error(`Error loading route.../${cleanName}: ${String(error)}`);
            }
        }
    }
};
(0, fs_1.readdirSync)(PATH_ROUTER).forEach((filename) => {
    importModule(filename);
});
//# sourceMappingURL=index.js.map