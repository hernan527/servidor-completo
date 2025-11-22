import "dotenv/config";
import { connect } from "mongoose";
import * as mongodb from "mongodb";
import { Employee } from "../interfaces/employee";
import { Empresa } from "../interfaces/empresas";
import { Planes } from "../interfaces/planes";
import { Clinicas } from "../interfaces/clinicas";
import { Precios } from "../interfaces/precios";
import { Posts } from "../interfaces/posts";
import { Cotizaciones } from "../interfaces/cotizaciones";


export const collections: {
    employees?: mongodb.Collection<Employee>,
    empresas?: mongodb.Collection<Empresa>,
    planes?: mongodb.Collection<Planes>,
    clinicas?: mongodb.Collection<Clinicas>,
    precios?: mongodb.Collection<Precios>,
    posts?: mongodb.Collection<Posts>,
    cotizaciones?: mongodb.Collection<Cotizaciones>
} = {};

async function dbConnect(): Promise<void> {
    const DB_URI = <string>process.env.DB_URI;
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

    const employeesCollection = db.collection<Employee>("employees");
    collections.employees = employeesCollection;
    
    
    const empresasCollection = db1.collection<Empresa>("empresas");
    collections.empresas = empresasCollection;

    const planesCollection = db1.collection<Planes>("planes");
    collections.planes = planesCollection;

    const clinicasCollection = db1.collection<Clinicas>("clinicas");
    collections.clinicas = clinicasCollection;

    const preciosCollection = db2.collection<Precios>("listasdeprecios"); 
    collections.precios = preciosCollection;

    const postsCollection = db3.collection<Posts>("posts"); 
    collections.posts = postsCollection;

    const cotizacionesCollection = db1.collection<Cotizaciones>("cotizaciones"); 
    collections.cotizaciones = cotizacionesCollection;
}

export default dbConnect;
