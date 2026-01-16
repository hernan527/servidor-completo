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
exports.getCollection = getCollection;
require("dotenv/config");
const mongodb = __importStar(require("mongodb"));
const supabase_js_1 = require("@supabase/supabase-js");
// Supabase (Manteniendo tu configuración actual)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️ Supabase: Faltan credenciales en el archivo .env");
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Objeto Global de Colecciones
exports.collections = {};
// Función de Conexión Principal
async function dbConnect() {
    const DB_URI = process.env.DB_URI;
    if (!DB_URI) {
        console.error("No ATLAS_URI environment variable has been defined in config.env");
        process.exit(1);
    }
    const client = new mongodb.MongoClient(DB_URI);
    await client.connect();
    // Definición de las 6 Bases de Datos
    const db = client.db("api-crud");
    const db1 = client.db("planes");
    const db2 = client.db("precios");
    const db3 = client.db("posts");
    const db4 = client.db("cotizaciones");
    const db5 = client.db("cotizaciones_finales");
    // Mapeo de Colecciones al Objeto Global
    exports.collections.employees = db.collection("employees");
    exports.collections.empresas = db1.collection("empresas");
    exports.collections.planes = db1.collection("planes");
    exports.collections.clinicas = db1.collection("clinicas");
    exports.collections.precios = db2.collection("listasdeprecios");
    exports.collections.posts = db3.collection("posts");
    exports.collections.cotizaciones = db4.collection("cotizaciones");
    // Asignación de la colección Maestra para el proceso de a 5
    exports.collections.cotizaciones_finales = db5.collection("cotizaciones_finales");
    console.log("✅ MongoDB: Todas las bases de datos y colecciones vinculadas correctamente.");
}
exports.default = dbConnect;
/**
 * Función Getter: Se usa en el script de procesamiento.
 * Espera a que dbConnect termine antes de entregar la colección.
 */
/**
 * Función Getter: Se usa en el script de procesamiento.
 * Usa "unknown" para evitar el error de superposición de tipos de TS.
 */
async function getCollection(collectionName) {
    let intentos = 0;
    while (!exports.collections[collectionName] && intentos < 20) {
        console.log(`⏳ [${intentos}] Esperando conexión a: ${collectionName}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        intentos++;
    }
    const col = exports.collections[collectionName];
    // VALIDACIÓN TÉCNICA: Verificamos que no sea undefined y que sea una colección real
    if (!col || typeof col.find !== 'function') {
        throw new Error(`❌ La colección ${collectionName} no es válida o no se inicializó.`);
    }
    // El "Fix" para el error de TypeScript: pasar por unknown
    return col;
}
//# sourceMappingURL=database.js.map