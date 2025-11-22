import { Cotizaciones } from "../interfaces/cotizaciones"
import CotizacionesModel from "../models/item";

const createCotizacion = async (item:Cotizaciones) => {
    const responseInsert = await CotizacionesModel.create(item)
    return responseInsert
};

const getCotizaciones = async () => {
    const responseGet = await CotizacionesModel.find({})
    return responseGet
};

const getCotizacion = async (id: string) => {
    const responseGetOne = await CotizacionesModel.findOne({_id:id})
    return responseGetOne
};

const updateCotizacion = async (id: string, data: Cotizaciones) => {
    const responseUpdate = await CotizacionesModel.findOneAndUpdate({_id:id},data,{new: true})
    return responseUpdate
};

const deleteCotizacion = async (id: string) => {
    const responsedelete = await CotizacionesModel.deleteOne({_id:id})
    return responsedelete
};


const searchCotizaciones = async (query: string) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await CotizacionesModel.find({
        concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
    })
    return responseSearch
  };

  
export { createCotizacion, getCotizaciones, getCotizacion, updateCotizacion, deleteCotizacion, searchCotizaciones };
