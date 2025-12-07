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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const error_handle_1 = require("../utils/error.handle");
const dotenv = __importStar(require("dotenv"));
const multer_1 = __importDefault(require("../middleware/multer"));
dotenv.config();
const { PORT } = process.env;
const fileUpload = async (req, res) => {
    try {
        // Middleware de carga de archivos, aquí se procesa el archivo y lo guarda en `req.file`
        multer_1.default.single('myFile')(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file uploaded',
                });
            }
            try {
                const result = await cloudinary_1.default.uploader.upload(req.file.path); // Subir a Cloudinary
                res.status(200).json({
                    success: true,
                    message: 'Uploaded!',
                    data: result,
                });
            }
            catch (cloudinaryError) {
                console.error(cloudinaryError);
                return res.status(500).json({
                    success: false,
                    message: 'Error uploading to Cloudinary',
                });
            }
        });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(res, 'ERROR_CREATE_ITEMS');
    }
};
exports.fileUpload = fileUpload;
//# sourceMappingURL=uploads.js.map