import { Schema, model } from "mongoose";
import { Cotizacion } from "../interfaces/cotizacion";

const cotizacionSchema = new Schema<Cotizacion>(
)

const CotizacionModel = model('cotizacion', cotizacionSchema);
export default CotizacionModel;