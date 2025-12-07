"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizarClinicasPorRegiones = exports.getPlanesIA = exports.getProductsIA = void 0;
const clinicas_1 = __importDefault(require("./../models/clinicas"));
const planes_1 = require("./planes");
let regiones = [];
let clinicasPorRegiones = {};
/**
 * Obtiene las regiones únicas disponibles en la colección.
 * Asume que 'ubicacion[0].region' siempre existe.
 */
async function obtenerRegionesDisponibles() {
    // Buscamos regiones en el primer subdocumento de ubicación (asumiendo que es la principal)
    // Utilizamos la notación de Mongoose 'ubicacion.0.region' para acceder directamente al campo.
    const regiones = await clinicas_1.default.distinct('ubicacion.0.region');
    return regiones;
}
/**
 * Organiza las clínicas por región. Asume que 'ubicacion[0]' es la ubicación principal válida.
 */
const organizarClinicasPorRegiones = async () => {
    // 1. Obtiene la lista de todas las regiones disponibles
    regiones = await obtenerRegionesDisponibles();
    // Inicializa un objeto para cada región
    for (const region of regiones) {
        clinicasPorRegiones[region] = [];
    }
    // 2. Realiza una consulta a la base de datos para obtener todas las clínicas
    const clinicas = await clinicas_1.default.find({}).lean();
    // 3. Organiza las clínicas por región, usando solo la ubicación principal
    for (const clinica of clinicas) {
        const ubicaciones = clinica.ubicacion; // Array de ubicaciones
        // ----------------------------------------------------
        // LÓGICA SIMPLIFICADA: 
        // Asumimos que ubicaciones[0] existe y tiene la propiedad 'region'.
        // ----------------------------------------------------
        try {
            // Accede directamente a la ubicación principal (posición 0)
            const ubicacionPrincipal = ubicaciones;
            // Ahora simplemente usamos la región de la primera ubicación
            const region = ubicacionPrincipal[0].region;
            // Agrega la clínica a la caché de la región correspondiente
            if (clinicasPorRegiones[region]) {
                clinicasPorRegiones[region].push(clinica);
            }
        }
        catch (e) {
            // Si a pesar de la regla de negocio, falta la ubicación[0] o la región, se loguea.
            console.warn(`[CHAT SERVICE] Documento de clínica saltado por ubicación faltante o inválida en [0]: ${clinica.nombre || clinica.item_id}`, e);
        }
    }
    return clinicasPorRegiones;
};
exports.organizarClinicasPorRegiones = organizarClinicasPorRegiones;
// Llama a la función para organizar las clínicas por regiones al iniciar el servicio
organizarClinicasPorRegiones().catch(err => console.error("Error al organizar clínicas:", err));
/**
 * Obtiene datos de clínicas para propósitos de IA, proyectando solo la primera ubicación.
 * Mongoose ya maneja la proyección 'ubicacion.0.<campo>' asumiendo que existe.
 */
const getProductsIA = async () => {
    // Usamos 'ubicacion.0.<campo>' para proyectar solo el primer elemento del array,
    // que es la ubicación principal. Esto es lo que se envía al LLM.
    const responseGet = await clinicas_1.default.find({}, {
        entity: 1,
        'ubicacion.0.direccion': 1,
        'ubicacion.0.barrio': 1,
        'ubicacion.0.partido': 1,
        'ubicacion.0.region': 1,
        cartillas: 1,
        _id: 0
    });
    return responseGet;
};
exports.getProductsIA = getProductsIA;
/**
 * Obtiene datos de planes para propósitos de IA, usando la región principal.
 */
const getPlanesIA = async () => {
    const responseGet = await (0, planes_1.obtenerPlanesConClinicas)();
    const responseFiltered = responseGet.map(plan => ({
        name: plan.name,
        empresa: plan.empresa,
        clinicas: (plan.clinicas || []).map((clinica) => {
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
exports.getPlanesIA = getPlanesIA;
//# sourceMappingURL=chat.js.map