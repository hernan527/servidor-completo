import mongoose from 'mongoose';
import ClinicasModel from './../models/clinicas';
// Importamos la interfaz correcta
import { Clinicas } from './../interfaces/clinicas'; 
import { obtenerPlanesConClinicas } from './planes';


let regiones: string[] = [];
let clinicasPorRegiones: { [key: string]: Clinicas[] } = {};

/**
 * Obtiene las regiones únicas disponibles en la colección.
 * Asume que 'ubicacion[0].region' siempre existe.
 */
async function obtenerRegionesDisponibles() {
  const regiones = await ClinicasModel.distinct('ubicaciones.region'); 
  return regiones;
}

/**
 * Organiza las clínicas por región manejando el array de objetos.
 */
const organizarClinicasPorRegiones = async () => {
  regiones = await obtenerRegionesDisponibles();

  // Limpiar objeto de caché
  clinicasPorRegiones = {};
  for (const region of regiones) {
    if (region) clinicasPorRegiones[region] = [];
  }

  const clinicas = await ClinicasModel.find({}).lean<Clinicas[]>(); 

  for (const clinica of clinicas) {
    try {
      // 1. Accedemos al nuevo nombre en plural
      const listaUbicaciones = clinica.ubicaciones; 

      // 2. Verificamos que sea un array y tenga al menos un elemento
      if (Array.isArray(listaUbicaciones) && listaUbicaciones.length > 0) {
        const region = listaUbicaciones[0].region;
        
        if (region && clinicasPorRegiones[region]) {
          clinicasPorRegiones[region].push(clinica);
        }
      } else {
        // Log opcional para detectar clínicas sin datos geográficos
        // console.warn(`Clínica ${clinica.nombre} no tiene array de ubicaciones.`);
      }

    } catch (e) {
      console.warn(`[CHAT SERVICE] Error procesando región: ${clinica.nombre}`, e);
    }
  }
  return clinicasPorRegiones;
}

// Llama a la función para organizar las clínicas por regiones al iniciar el servicio
organizarClinicasPorRegiones().catch(err => console.error("Error al organizar clínicas:", err));


/**
 * Obtiene datos de clínicas para propósitos de IA, proyectando solo la primera ubicación.
 * Mongoose ya maneja la proyección 'ubicacion.0.<campo>' asumiendo que existe.
 */
const getProductsIA = async () => {
  // Usamos 'ubicacion.0.<campo>' para proyectar solo el primer elemento del array,
  // que es la ubicación principal. Esto es lo que se envía al LLM.
  const responseGet = await ClinicasModel.find({}, {
    entity: 1,
    'ubicacion.0.direccion': 1, 
    'ubicacion.0.barrio': 1,
    'ubicacion.0.partido': 1,
    'ubicacion.0.region': 1, 
    cartillas: 1,
    _id: 0
  });
  return responseGet
};


/**
 * Obtiene datos de planes para propósitos de IA, usando la región principal.
 */
const getPlanesIA = async () => {
  const responseGet = await obtenerPlanesConClinicas();

  const responseFiltered = responseGet.map(plan => ({
    name: plan.name,
    empresa: plan.empresa,
    clinicas: (plan.clinicas || []).map((clinica: any) => {
      // Accedemos directamente a la primera ubicación, asumiendo que es la principal y está presente
      const ubicacionPrincipal = clinica.ubicacion && clinica.ubicacion.length > 0 ? clinica.ubicacion[0] : null;

      return {
        nombre: clinica.nombre,
        // Usamos la región de la ubicación principal sin la validación estricta que hicimos antes,
        // confiando en la estructura del dato.
        region: ubicacionPrincipal?.region || 'Región Desconocida' 
      };
    })
  }));

  return responseFiltered;
}; 

export { getProductsIA, getPlanesIA, organizarClinicasPorRegiones};