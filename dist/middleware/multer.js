"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const fileName = Date.now();
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
//# sourceMappingURL=multer.js.map