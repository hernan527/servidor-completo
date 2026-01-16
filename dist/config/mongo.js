"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = require("mongoose");
async function dbConnect() {
    const DB_URI = process.env.DB_URI;
    await (0, mongoose_1.connect)(DB_URI, {
        // Aumentamos el pool para que soporte las 50 promesas paralelas + el tráfico normal
        maxPoolSize: 100,
        // Tiempo de espera para obtener una conexión del pool
        serverSelectionTimeoutMS: 5000,
        // Mantiene conexiones vivas para evitar el costo de reconexión constante
        socketTimeoutMS: 45000,
    });
}
exports.default = dbConnect;
// import "dotenv/config";
// import { connect } from "mongoose";
// async function dbConnect(): Promise<void> {
//     const DB_URI = <string>process.env.DB_URI;
//     await connect(DB_URI);
// }
// export default dbConnect;
//# sourceMappingURL=mongo.js.map