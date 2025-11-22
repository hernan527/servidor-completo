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
const organizarClinicasPorRegiones = async () => {
  regiones = await obtenerRegionesDisponibles();
  
  // Inicializa un objeto para cada región
  for (const region of regiones) {
    clinicasPorRegiones[region] = [];
  }

  // Realiza una consulta a la base de datos para obtener todas las clínicas
  const clinicas = await ClinicasModel.find({});
  
  // Organiza las clínicas por región
  for (const clinica of clinicas) {
    const region = clinica.ubicacion.region;
    clinicasPorRegiones[region] = clinicasPorRegiones[region] || [];
    clinicasPorRegiones[region].push(clinica);
  }
  return clinicasPorRegiones;
}

// Llama a la función para organizar las clínicas por regiones
organizarClinicasPorRegiones();


const getProductsIA = async () => {
  const responseGet = await ClinicasModel.find({}, {
    entity: 1,
    direccion: 1,
    barrio: 1,
    partido: 1,
    region: 1,
    cartillas: 1,
    // explícitamente excluye _id si no lo querés
    _id: 0
  });
  return responseGet
};


const getPlanesIA = async () => {

  const responseGet = await obtenerPlanesConClinicas();
  
   const getPlanesIA = async () => {
  const responseGet = await obtenerPlanesConClinicas();

  const responseFiltered = responseGet.map(plan => ({
    name: plan.name,
    empresa: plan.empresa,
    clinicas: (plan.clinicas || []).map((clinica: any) => ({
      nombre: clinica.nombre,
      region: clinica.region
    }))
  }));

  return responseFiltered;
};

}; 
export { getProductsIA, getPlanesIA, organizarClinicasPorRegiones};
