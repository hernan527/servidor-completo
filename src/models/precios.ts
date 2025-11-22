import { Schema, model } from "mongoose";
import { Precios } from "../interfaces/precios";

const precioSchema = new Schema<Precios>(
    {   _id: String,
        prices: {
        type: Map,
        of: Number
    }
}
)

const PreciosModel = model('precios', precioSchema);
export default PreciosModel;