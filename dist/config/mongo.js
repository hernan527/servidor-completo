"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = require("mongoose");
async function dbConnect() {
    const DB_URI = process.env.DB_URI;
    await (0, mongoose_1.connect)(DB_URI);
}
exports.default = dbConnect;
//# sourceMappingURL=mongo.js.map