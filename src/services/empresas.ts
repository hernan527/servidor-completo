import EmpresaModel from './../models/empresas';
import PlanesModel from './../models/planes';
import { obtenerPlanesConClinicas } from './planes';


async function obtenerEmpresasDisponibles() {
    const empresas = await PlanesModel.distinct('empresa');
        return empresas;
  }
  const createProduct = async (item: any) => {
    const responseCreate = await EmpresaModel.create(item)
    return responseCreate;
};

const getProducts = async () => {
    const responseGet = await EmpresaModel.find({});
    return responseGet
};

const getProduct = async (id: string) => {
   

    
    const responseGetOne = await EmpresaModel.findOne({_id:id})
    // console.log( ' responseGetOne : ', id)

    return responseGetOne
};

const updateProduct = async (id: string, data: any) => {
    const responseUpdate = await EmpresaModel.findOneAndUpdate({_id:id},data,{new: true})
    return responseUpdate
};

const deleteProduct = async (id: string) => {
    const responsedelete = await EmpresaModel.deleteOne({_id:id})
    return responsedelete
};

const searchProducts = async (query: string) => {
    // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
    const responseSearch = await EmpresaModel.find({
        concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
    })
    return responseSearch
};

const getPlanes = async () => {

    const responseGet = await obtenerPlanesConClinicas();

    return responseGet
}; 
export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts ,getPlanes};

  export { obtenerEmpresasDisponibles };