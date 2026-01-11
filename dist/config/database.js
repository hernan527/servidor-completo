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
exports.collections = exports.supabase = void 0;
require("dotenv/config");
const mongodb = __importStar(require("mongodb"));
const supabase_js_1 = require("@supabase/supabase-js");
// Asegúrate de tener estas variables en tu archivo .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️ Supabase: Faltan credenciales en el archivo .env");
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports.collections = {};
async function dbConnect() {
    const DB_URI = process.env.DB_URI;
    if (!DB_URI) {
        console.error("No ATLAS_URI environment variable has been defined in config.env");
        process.exit(1);
    }
    const client = new mongodb.MongoClient(DB_URI);
    await client.connect();
    const db = client.db("api-crud");
    const db1 = client.db("planes");
    const db2 = client.db("precios");
    const db3 = client.db("posts");
    const db4 = client.db("cotizaciones");
    // await applySchemaValidation(db);
    // await applySchemasValidation(db1);
    const employeesCollection = db.collection("employees");
    exports.collections.employees = employeesCollection;
    const empresasCollection = db1.collection("empresas");
    exports.collections.empresas = empresasCollection;
    const planesCollection = db1.collection("planes");
    exports.collections.planes = planesCollection;
    const clinicasCollection = db1.collection("clinicas");
    exports.collections.clinicas = clinicasCollection;
    const preciosCollection = db2.collection("listasdeprecios");
    exports.collections.precios = preciosCollection;
    const postsCollection = db3.collection("posts");
    exports.collections.posts = postsCollection;
    const cotizacionesCollection = db1.collection("cotizaciones");
    exports.collections.cotizaciones = cotizacionesCollection;
}
exports.default = dbConnect;
//# sourceMappingURL=database.js.map