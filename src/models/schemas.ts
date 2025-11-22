import { Schema } from "mongoose";

export const ubicacionSchema = new Schema({
    calle_y_numero: String,
    telefono: String,
    barrio: String,
    partido: String,
    region: String,
    provincia: String,
    CP: String
});
