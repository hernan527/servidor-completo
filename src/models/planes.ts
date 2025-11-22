// models/planes.ts
import { Schema, model } from "mongoose";
import { Planes } from "../interfaces/planes";
import mongoose from 'mongoose';
import { ClinicaSchema } from "./clinicas";

// const attributeSchema = new Schema({
//   id: { type: String, default: null },
//   name: { type: String, required: true },
//   value_id: { type: String, default: null },
//   value_name: { type: String, required: true },
//   attribute_group_id: { type: String, default: null },
//   attribute_group_name: { type: String, required: true },
//   value_type: { type: String, default: null }
// }, { _id: false }); // evita crear sub-_id innecesario

// Schema para el sub-documento de 'images'
const ImageSchema = new mongoose.Schema({
    id: { type: String, default: "" },
    descripcion: String,
    empresa: String,
    url: String,
}, { _id: false }); // Usamos _id: false si no queremos que Mongoose genere un _id para cada imagen



const PlanSchema = new mongoose.Schema({
    item_combine: String,
    item_id: String,
    copagos: Boolean,
    name: String,
    empresa: String,
    sigla: String,
    folleto: [String],
    price: Number,
    rating: Number,
    linea: String,
    // Aquí es donde se define la estructura de los campos que antes se perdían:
    images: [ImageSchema], 
    clinicas: [ClinicaSchema],
    // Otros campos
    beneficios: mongoose.Schema.Types.Mixed,
    attributes: [mongoose.Schema.Types.Mixed],
}, { collection: 'planes' }); // Asegúrate de que el nombre de la colección sea correcto

const PlanesModel = mongoose.model('Plan', PlanSchema);
export default PlanesModel;