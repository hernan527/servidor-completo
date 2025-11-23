import { Schema } from "mongoose";

export const UbicacionSchema: Schema = new Schema({
    direccion: { type: String, required: true },
    telefono: { type: String, required: false },
    barrio: { type: String, required: true },
    partido: { type: String, required: true },
    region: { type: String, required: true },
    provincia: { type: String, required: true },
    CP: { type: String, required: true },
}, { _id: false });

