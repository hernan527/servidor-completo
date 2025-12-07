"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', uploads_1.fileUpload);
//# sourceMappingURL=uploads.js.map