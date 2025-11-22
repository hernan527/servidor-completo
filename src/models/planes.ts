// models/planes.ts
import { Schema, model } from "mongoose";
import { Planes } from "../interfaces/planes";

const attributeSchema = new Schema({
  id: { type: String, default: null },
  name: { type: String, required: true },
  value_id: { type: String, default: null },
  value_name: { type: String, required: true },
  attribute_group_id: { type: String, default: null },
  attribute_group_name: { type: String, required: true },
  value_type: { type: String, default: null }
}, { _id: false }); // evita crear sub-_id innecesario

const planSchema = new Schema<Planes>({
  item_id: String,
  name: String,
  empresa: String,
  price: Number,
  precio: Number,
  rating: Number, // o String si prefieres, pero debe coincidir con interfaz
  copagos: Boolean,
  category: String,
  tags: [String],
  hijosSolos: Boolean,
  folletos: [String],
  images: [String], // si son URLs, no [Object]
  attributes: [attributeSchema], // 👈 CORRECCIÓN AQUÍ
  Cirugia_Estetica: Boolean,
  Cobertura_Nacional: Boolean,
  Habitacion_Individual: Boolean,
  Ortodoncia_Adultos: Boolean,
  PMO_Solo_por_Aportes: Boolean,
  Sin_Copagos: Boolean,
  raiting: Number,
  valueSlide3: Number,
  valueSlide4: Number,
  aporteOS: Number,
  clinicas: [String], // si son strings (nombres), no [Object]
  sigla: String,
  imagenes: Schema.Types.Mixed // o define un esquema si es estructurado
}, {
  timestamps: true // opcional, pero útil
});

const PlanesModel = model('planes', planSchema);
export default PlanesModel;