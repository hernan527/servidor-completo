import "dotenv/config";
import * as mongodb from "mongodb";
import { Employee } from "../interfaces/employee";
import { Empresa } from "../interfaces/empresas";
import { Planes } from "../interfaces/planes";
import { Clinicas } from "../interfaces/clinicas";
import { Precios } from "../interfaces/precios";
import { Posts } from "../interfaces/posts";
import { ICotizacionMaestra } from "../interfaces/respuestas";
import { Cotizaciones } from "../interfaces/cotizaciones";
import { createClient } from '@supabase/supabase-js';

// Supabase (Manteniendo tu configuración actual)
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Supabase: Faltan credenciales en el archivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Objeto Global de Colecciones
export const collections: {
    employees?: mongodb.Collection<Employee>,
    empresas?: mongodb.Collection<Empresa>,
    planes?: mongodb.Collection<Planes>,
    clinicas?: mongodb.Collection<Clinicas>,
    precios?: mongodb.Collection<Precios>,
    posts?: mongodb.Collection<Posts>,
    cotizaciones?: mongodb.Collection<Cotizaciones>,
    cotizaciones_finales?: mongodb.Collection<ICotizacionMaestra>
} = {};

// Función de Conexión Principal
async function dbConnect(): Promise<void> {
    const DB_URI = <string>process.env.DB_URI;
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
    collections.employees = db.collection<Employee>("employees");
    collections.empresas = db1.collection<Empresa>("empresas");
    collections.planes = db1.collection<Planes>("planes");
    collections.clinicas = db1.collection<Clinicas>("clinicas");
    collections.precios = db2.collection<Precios>("listasdeprecios"); 
    collections.posts = db3.collection<Posts>("posts"); 
    collections.cotizaciones = db4.collection<Cotizaciones>("cotizaciones");
    
    // Asignación de la colección Maestra para el proceso de a 5
    collections.cotizaciones_finales = db5.collection<ICotizacionMaestra>("cotizaciones_finales");

    console.log("✅ MongoDB: Todas las bases de datos y colecciones vinculadas correctamente.");
}

export default dbConnect;

/**
 * Función Getter: Se usa en el script de procesamiento.
 * Espera a que dbConnect termine antes de entregar la colección.
 */
/**
 * Función Getter: Se usa en el script de procesamiento.
 * Usa "unknown" para evitar el error de superposición de tipos de TS.
 */
export async function getCollection<T extends mongodb.Document>(
    collectionName: keyof typeof collections
): Promise<mongodb.Collection<T>> {
    
    let intentos = 0;
    while (!collections[collectionName] && intentos < 20) {
        console.log(`⏳ [${intentos}] Esperando conexión a: ${collectionName}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        intentos++;
    }

    const col = collections[collectionName];

    // VALIDACIÓN TÉCNICA: Verificamos que no sea undefined y que sea una colección real
    if (!col || typeof col.find !== 'function') {
        throw new Error(`❌ La colección ${collectionName} no es válida o no se inicializó.`);
    }

    // El "Fix" para el error de TypeScript: pasar por unknown
    return (col as unknown) as mongodb.Collection<T>;
}