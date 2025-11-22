import mongoose from 'mongoose';
import ClinicasModel from './../models/clinicas';
import { Clinicas } from './../interfaces/clinicas';
import { obtenerPlanesConClinicas } from './planes';


let regiones: string[] = [];
let clinicasPorRegiones: { [key: string]: Clinicas[] } = {};

async function obtenerRegionesDisponibles() {
  const regiones = await ClinicasModel.distinct('ubicacion.region');
  return regiones;
}

async function organizarClinicasPorRegiones() {
  regiones = await obtenerRegionesDisponibles();
  
  // Inicializa un objeto para cada región
  for (const region of regiones) {
    clinicasPorRegiones[region] = [];
  }

  // Realiza una consulta a la base de datos para obtener todas las clínicas
  const clinicas = await ClinicasModel.find({});
  
  // Organiza las clínicas por región
  for (const clinica of clinicas) {
    // Verifica que 'ubicacion' y 'region' existan antes de acceder
    const region = clinica.ubicacion?.region; // Uso del operador de encadenamiento opcional

    // Asegúrate de que region no sea undefined
    if (region && clinicasPorRegiones.hasOwnProperty(region)) {
      clinicasPorRegiones[region].push(clinica);
    }
  }

  return clinicasPorRegiones;
}

// Llama a la función para organizar las clínicas por regiones
organizarClinicasPorRegiones();

const createProduct = async (item: any) => {
  const responseCreate = await ClinicasModel.create(item)
  return responseCreate;
};

const getProducts = async () => {
  const responseGet = await ClinicasModel.find({});
  return responseGet
};

const getProduct = async (id: string) => {
 
  
  const responseGetOne = await ClinicasModel.findOne({_id:id})
  
  return responseGetOne
};

const updateProduct = async (id: string, data: any) => {
  const responseUpdate = await ClinicasModel.findOneAndUpdate({_id:id},data,{new: true})
  return responseUpdate
};

const deleteProduct = async (id: string) => {
  const responsedelete = await ClinicasModel.deleteOne({_id:id})
  return responsedelete
};

const searchProducts = async (query: string) => {
  // Realiza la búsqueda en la base de datos, por ejemplo, por nombre
  const responseSearch = await ClinicasModel.find({
      concept: { $regex: query, $options: 'i' } as { $regex: string, $options: string },
  })
  return responseSearch
};

const getPlanes = async () => {

  const responseGet = await obtenerPlanesConClinicas();

  return responseGet
}; 
export { createProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProducts ,getPlanes};
