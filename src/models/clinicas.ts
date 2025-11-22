import { Schema, model } from "mongoose";
import { Clinicas } from "../interfaces/clinicas";

// Definir el esquema de las coberturas
const coberturaSchema = new Schema({
    key: String,
    label: String,
    children: [{
      key: String,
      id: String,
      label: String,
      partialSelected: Boolean
    }],
    partialSelected: Boolean
  });

const clinicasSchema = new Schema<Clinicas>(
    {
        nombre: String,
        entity: String,
        cartillas: [String],
        coberturas: [coberturaSchema], // Cambiado de [String] a [Cobertura]
        item_id: String,
        ubicacion: {
            calle_y_numero:String,
            telefono:String,
            barrio:String,
            partido:String,
            region:String,
            provincia: String,
            CP: String
        },
        url: String,
        imagen: {
            ruta: String,
            descripcion: String
        },
        tipo: String,
        especialidades: [String],
        rating: Number,
        select: Boolean
    }
);

// Crear el modelo de Mongoose para las coberturas
// const CoberturaModel = model<Cobertura>('Cobertura', coberturaSchema);
// export {CoberturaModel };

const ClinicasModel = model<Clinicas>('clinicas', clinicasSchema);
export default ClinicasModel;