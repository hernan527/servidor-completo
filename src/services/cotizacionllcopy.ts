import { Request, Response } from 'express';
import * as servicios from './index'; 
import * as functions from '../funciones';
import PreciosModel from '../models/precios'; 

import { getProduct } from './precios'

import { handleHttp } from '../utils/error.handle';
import { Document } from 'mongoose';
import { Clinicas } from '../interfaces/clinicas';
import { Empresa } from '../interfaces/empresas';

import ClinicasModel from './../models/clinicas';
import PlanesModel from './../models/planes';
import EmpresaModel from './../models/empresas';
export const  calcularPrecio = async (req: Request, res: Response) => {
 try{
// console.log('linea 18 : '+ req .body.grupo);
// console.log('linea 19 : '+ req .body.empresa_prepaga);
// console.log('linea 20 : '+ req .body.edad_1);
// console.log('linea 21 : '+ req .body.edad_2);    
// console.log('linea 22 : '+ req .body.numkids); 
// console.log('linea 23 : '+ req .body.plan_type);
// console.log('linea 24 : '+ req .body.tipo);
// console.log('linea 25 : '+ req .body.agree);
// console.log('linea 26 : '+ req .body.aporteOS);
// console.log('linea 27 : '+ req .body.sueldo);
// console.log('linea 28 : '+ req .body.aporte);
// console.log('linea 29 : '+ req .body.monoadic);
// console.log('linea 30 : '+ req .body.cantAport);
// console.log('linea 31 : '+ req .body.afinidad);
// console.log('linea 32 : '+ req .body.bonAfinidad);
// console.log('linea 33 : '+ req .body.supras);
// console.log('linea 34 : '+ req .body.segvida);
// console.log('linea 35 : '+ req .body.segvida1);
// console.log('linea 36 : '+ req .body.region);
// console.log('linea 37 : '+ req .body.coeficientes);

// const group = req.body.grupo;

// const empresa_prepaga = req.body.empresa_prepaga;

// const edad_1 = req.body.edad_1;

// const edad_2 = req.body.edad_2;    
  
// const numkids = req.body.numkids; 

// const plan_type = req.body.plan_type;

// const tipo = req.body.tipo;

// const agree = req.body.agree;

// const aporteOS = req.body.aporteOS;

// const sueldo = req.body.sueldo;

// const aporte = req.body.aporte;

// const monoadic = req.body.monoadic;

// const cantAport = req.body.cantAport;

// const afinidad = req.body.afinidad;

// const bonAfinidad = req.body.bonAfinidad;

// const supras = req.body.supras;

// const segvida = req.body.segvida;

// const segvida1 = req.body.segvida1;;

// const region = req.body.region;

// const coeficientes = req.body.coeficientes;

  
  





console.log('linea 86');
const formCotizar = req.body;
console.log('linea 89');
// Extraer datos del formulario
const {
  group,
  empresa_prepaga, 
  edad_1,
  edad_2,
  numkids,
  plan_type,
  tipo,
  agree,
  aporteOS,
  sueldo,
  aporte,
  monoadic,
  cantAport,
  afinidad,
  bonAfinidad,
  supras,
  segvida,
  segvida1,
  region,
} = formCotizar;
// console.log({
//   group,
//   empresa_prepaga,
//   edad_1,
//   edad_2,
//   numkids,
//   plan_type,
//   tipo,
//   agree,
//   aporteOS,
//   sueldo,
//   aporte,
//   monoadic,
//   cantAport,
//   afinidad,
//   bonAfinidad,
//   supras,
//   segvida,
//   segvida1,
//   region
// });
console.log('linea 112');
const calcularGrupo = (edad_1: number, edad_2: number, numkids: number, group: string) => {
  let edad1 = edad_1;
  let edad2 = edad_2;
  let num_kids = numkids;

  if (edad_2 === null) {
    edad2 = 0;
  } else if (numkids === null) {
    num_kids = 0;
  }

  let grupo = functions.grupoFamiliar(edad1, edad2, num_kids, group);
  return grupo;
};
console.log('linea 127');
// Llamada a la función para obtener el grupo
const grupo = calcularGrupo(edad_1, edad_2, numkids, group);


// Ahora puedes usar la variable 'grupo' en el resto de tu código

console.log('esta es la variable grupo ' , grupo)

  const porcentaje: { [nombreEmpresa: string]: number } = {};

  const beneficiariosF184 = cantAport;
  const eleccionSueldoOAporte = aporteOS;
  const sueldoSueldoOAporte = sueldo;
  const categoria_Mono = "";
  const arrayValorMonotXCategoria: any[] = [];

    let numhijo2 = grupo[2]; //checked
    let numHijos = grupo[3]; //checked
    let gen = grupo[4]; //checked
    let grupoFam = grupo[5];

console.log('grupoFam')
console.log(grupoFam)

    let tipo_IngresoPDMI = functions.tipoAsociado(tipo);
console.log(tipo_IngresoPDMI)
    const aporte_OS = [tipo_IngresoPDMI,beneficiariosF184,eleccionSueldoOAporte,sueldoSueldoOAporte,categoria_Mono,arrayValorMonotXCategoria]
console.log(tipo_IngresoPDMI)

// <! ----------SANCOR---------------------------------------------------->
let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos,group);
let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos,group);
console.log(idSancor1)
let idSancorConyuge: string
if (grupoFam >= 3) {
  idSancorConyuge = idSancor1[1];
console.log(idSancorConyuge)
}else {idSancorConyuge
  =idSancor[0]}
console.log(idSancorConyuge)
// <! -----------------------------OMINT---------------------------------------------------->
let idOmint =  functions.productIdOmint(edad_1, tipo, 'titular',group);
// <! -----------------------------GALENO--------------------------------------------------->
let idGaleno = functions.productIdGaleno(edad_1, edad_2, tipo, numHijos,group);
// <! ----------PREMEDIC-------------------------------------------------------------------->
let edadIdPremedic = functions.productIdPremedic(edad_1, edad_2, tipo, numHijos,group);
// <! ----------SWISS----------------------------------------------------------------------->
let idTitularSwiss = functions.productIdSwiss(edad_1, tipo_IngresoPDMI,group);
let idConyugeSwiss = functions.productIdSwiss(edad_2, tipo_IngresoPDMI,group);
let idHijo1Swiss = tipo_IngresoPDMI+'1h';
let idHijo2Swiss =  tipo_IngresoPDMI +'2h';

// <! ----------MEDIFE---------------------------------------------------->
let idAdultosMedife = functions.productIdMedife(edad_1,edad_1, tipo_IngresoPDMI);
// <! ----------PREVENCION---------------------------------------------------->
let idPrevencion = functions.productIdPrevencion(edad_1,edad_1, numkids, tipo_IngresoPDMI);
    let schema = "precios";

async function fetchProductPrice(id: string) {
  console.log( ' funcion en linea 183 : id: ', id)
 return await getProduct(id);
}

const companies = await EmpresaModel.find({});
  
  
const empresasConCoeficientes = companies.map(empresa => {
  const nombre = String(empresa.name); // Asegúrate de que sea una cadena
  return { [nombre]: empresa.factores.coeficiente };
});

console.log('Coeficientes de todas las empresas:', empresasConCoeficientes);
// Acceder al coeficiente de una empresa en particular por su nombre
async function buscar_mi_coeficiente(type:string){
const coeficiente = empresasConCoeficientes.find(empresa => empresa[type]);
if (coeficiente) {
return coeficiente  
} else {
console.log(`No se encontró la empresa ${type}.`);
}

}

async function fetchPrices() {
  const prices: { [key: string]: any } = {};
  console.log('linea 233 idSancor : ' + idSancor);
  console.log('linea 234 idSancor1 :' + idSancor1);

  const productQueries = [
      { variable: 'priceAdultosPr', id: 'premedic' + functions.productIdPremedic(edad_1, edad_2, tipo, numHijos, group) },
      { variable: 'pricePrHijoMenir1', id: 'premedic' + tipo + 'AD-1anio' },
      { variable: 'pricePrHijoMenir25', id: 'premedic' + tipo + 'AD-25' },
      { variable: 'precioTitularSwiss', id: 'swiss' + idTitularSwiss },
      { variable: 'precioConyugeSwiss', id: 'swiss' + idConyugeSwiss },
      { variable: 'precioHijo1Swiss', id: 'swiss' + tipo_IngresoPDMI + '1h' },
      { variable: 'precioHijo2Swiss', id: 'swiss' + tipo_IngresoPDMI + '2h' },
      { variable: 'precio_titular_Omint', id: idOmint[0] },
      { variable: 'precio_conyuge_Omint', id: functions.productIdOmint(edad_2, tipo, 'conyuge', group)[1] },
      { variable: 'precio_hijo1_Omint', id: idOmint[2] },
      { variable: 'precio_hijo2_Omint', id: idOmint[3] },
      { variable: 'precio1Hijo', id: idSancor[2] },
      { variable: 'precio2Hijo', id: idSancor[3] },
      { variable: 'precioTitular', id: idSancor[0] },
      { variable: 'precioConyuge', id: idSancorConyuge },
      { variable: 'priceGrupoGaleno', id: 'galeno' + idGaleno },
      { variable: 'idAdultosMedife', id: idAdultosMedife },
      { variable: 'idHIjo0a1', id: tipo_IngresoPDMI + 'HIJO0a1' },
      { variable: 'idHIjo0a20', id: tipo_IngresoPDMI + 'HIJO2a20' },
      { variable: 'idHIjo0a25', id: tipo_IngresoPDMI + 'HIJO25' },
      { variable: 'idPrevencion', id: idPrevencion }
  ];

  const promises = productQueries.map(async (query) => {
      console.log(`Fetching price for ${query.variable} with ID: ${query.id}`);
      try {
          const result = await fetchProductPrice(query.id);
          return { [query.variable]: result };
      } catch (error) {
          console.error(`Error fetching price for ${query.id}:`, error);
          return { [query.variable]: null };
      }
  });

  const results = await Promise.all(promises);
  results.forEach((result) => Object.assign(prices, result));

  return prices;
}

   const prices = await fetchPrices();
console.log(' prices ' ,prices)

// <! -----------------------------ID GALENO START---------------------------------------------------->
// <! -----------------------------ID GALENO END---------------------------------------------------->

// <! -----------------------------ID PREMEDIC START---------------------------------------------------->

// let priceAdultosPr  = await getProduct('premedic' + functions.productIdPremedic(edad_1, edad_2, tipo, numHijos,group));
//    let pricePrHijoMenir1  = await getProduct('premedic' + tipo + 'AD-1anio');
//    let pricePrHijoMenir25  = await getProduct('premedic' + tipo + 'AD-25');
//    let precioTitularSwiss  = await getProduct('swiss' + idTitularSwiss);
//    let precioConyugeSwiss  = await getProduct('swiss' + idConyugeSwiss);
//    let precioHijo1Swiss  = await getProduct('swiss' + idHijo1Swiss);
//    let precioHijo2Swiss  = await getProduct('swiss' + idHijo2Swiss);
//    let precio_titular_Omint  = await getProduct(idOmint[0]);
//    let precio_conyuge_Omint  = await getProduct(functions.productIdOmint(edad_2, tipo, 'conyuge',group)[1]);
//    let precio_hijo1_Omint  = await getProduct(idOmint[2]);
//    let precio_hijo2_Omint  = await getProduct(idOmint[3]);
//    let precio1Hijo  = await getProduct(idSancor[2]);
//    let precio2Hijo  = await getProduct(idSancor[3]);
//    let precioTitular  = await getProduct(idSancor[0]);
//    let precioConyuge  = await getProduct(idSancorConyuge);
//    let priceGrupoGaleno  = await getProduct('galeno' + idGaleno);
   
   console.log('priceAdultosPr  ', priceAdultosPr);
   console.log('pricePrHijoMenir25  ', pricePrHijoMenir25);
   console.log('pricePrHijoMenir1  ', pricePrHijoMenir1);

   console.log('priceAdultosPr  ', priceAdultosPr.precios);
   console.log('pricePrHijoMenir25  ', pricePrHijoMenir25.precios);
   console.log('pricePrHijoMenir1  ', pricePrHijoMenir1.precios);




    let valor_Premedic = functions.valor_Premedic(
      aporte_OS,
      buscar_mi_coeficiente('Premedic'),
      numkids,
      priceAdultosPr.precios, 
      pricePrHijoMenir25.precios, 
      pricePrHijoMenir1.precios, 
      edadIdPremedic,
      afinidad, 
      bonAfinidad,
      group
    )
    console.log('valor_Premedic')

console.log(valor_Premedic)

// <! -----------------------------ID PREMEDIC END---------------------------------------------------->


// <! -----------------------------ID OMINT START---------------------------------------------------->
// <! -----------------------------ID OMINT END---------------------------------------------------->

// <! -----------------------------VALOR PRECIO SANCOR START---------------------------------------------------->





// Use the toObject method to convert Mongoose Documents to plain JavaScript objects
// precio1Hijo = precio1Hijo.toObject();
// precio2Hijo = precio2Hijo.toObject();
// precioTitular = precioTitular.toObject();
// precioConyuge = precioConyuge.toObject();
console.log('precio1Hijo.precios:', precio1Hijo.precios);
console.log('precio2Hijo.precios:', precio2Hijo.precios);
console.log('precioTitular.precios:', precioTitular.precios);
console.log('precioConyuge.precios:', precioConyuge.precios);




let valor_SanCor = functions.valor_SanCor(
  aporte_OS,
  buscar_mi_coeficiente('SanCor Salud'),
  edad_1, // dato del formulario - edad del titular
  edad_2, // dato del formulario - edad del conyuge
  numkids, // dato del formulario - cantidad total de hijos
  precio1Hijo.precios,// busqueda por _id en lista de precio
  precio2Hijo.precios,// busqueda por _id en lista de precio
  precioTitular.precios,// busqueda por _id en lista de precio
  precioConyuge.precios,// busqueda por _id en lista de precio
  numhijo2, // respuesta funcion grupoFamiliar
  grupoFam, // respuesta funcion grupoFamiliar
  segvida, // dato del formulario ( check = true/false )
  segvida1, // dato del formulario ( check = true/false )
  supras, // dato del formulario ( check = true/false )
  afinidad, // dato del formulario ( check = true/false )
  bonAfinidad, // dato del formulario 
  gen// respuesta funcion grupoFamiliars
  );
  console.log('valor_SanCor')

console.log(valor_SanCor)
// <! -----------------------------VALOR PRECIO SANCOR END---------------------------------------------------->

// <! -----------------------------VALOR PRECIO OMINT START------------------------------------------------------>

// precio_titular_Omint = precio_titular_Omint.toObject();
// precio_conyuge_Omint = precio_conyuge_Omint.toObject();
// precio_hijo1_Omint = precio_hijo1_Omint.toObject();
// precio_hijo2_Omint = precio_hijo2_Omint.toObject();

console.log('precio_titular_Omint',precio_titular_Omint.precios);
console.log('precio_conyuge_Omint',precio_conyuge_Omint.precios);
console.log('precio_hijo1_Omint',precio_hijo1_Omint.precios);
console.log('precio_hijo2_Omint',precio_hijo2_Omint.precios);

let valor_OMINT = functions.valorOmint(
  aporte_OS,
  edad_2, // dato del formulario - edad del conyuge
  numHijos,// respuesta funcion grupoFamiliar
  numhijo2, // hijos a partir del segundo 
  precio_titular_Omint.precios,// busqueda por _id en lista de precio
  precio_conyuge_Omint.precios,// busqueda por _id en lista de precio
  precio_hijo1_Omint.precios,// busqueda por _id en lista de precio
  precio_hijo2_Omint.precios,// busqueda por _id en lista de precio
  idOmint[0], // id Titular
  afinidad, // dato del formulario ( check = true/false )
  bonAfinidad, // dato del formulario % de descuento
  buscar_mi_coeficiente('OMINT')
  );
  console.log('valor_OMINT')

  console.log(valor_OMINT)


// <! -----------------------------VALOR PRECIO OMINT END---------------------------------------------------->
// <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->


// ...



let valor_Galeno = functions.valor_Galeno(
    aporte_OS,
    priceGrupoGaleno.precios,
    buscar_mi_coeficiente('Galeno')
    
    );
        console.log('valor_Galeno')

    console.log(valor_Galeno)

// <! -----------------------------VALOR PRECIO GALENO END----------------------------------prices------------------>
// <! -----------------------------VALOR PRECIO GALENO START---------------------------------------------------->
// precioTitularSwiss = precioTitularSwiss.toObjet();
// precioConyugeSwiss = precioConyugeSwiss.toObjet();
// precioHijo1Swiss = precioHijo1Swiss.toObjet();
// precioHijo2Swiss = precioHijo2Swiss.toObjet();

console.log('precioTitularSwiss  ',precioTitularSwiss.precios);
console.log('precioConyugeSwiss  ',precioConyugeSwiss.precios);
console.log('precioHijo1Swiss  ',precioHijo1Swiss.precios);
console.log('precioHijo2Swiss  ',precioHijo2Swiss.precios);

let valor_Swiss = functions.valor_Swiss(
  aporte_OS,
  edad_1, 
  edad_2, 
  numkids,
  numhijo2,
  precioTitularSwiss.precios,
  precioConyugeSwiss.precios,
  precioHijo1Swiss.precios,
  precioHijo2Swiss.precios,
  buscar_mi_coeficiente('Swiss Medical'),
  group
  )
console.log('valor_Swiss')

console.log(valor_Swiss)

// for ( let i=0 ; i < prices.length ; i++){
// console.log(prices[i])

// }

// <! -----------------------------VALOR PRECIO MEDIFE START---------------------------------------------------->

// let valorMedife = functions.valorMedife(
//  aporte_OS,
//  edad_1, 
//  edad_2, 
//  numkids,
//  numhijo2,
//  precioTitularMedife.precios,
//  precioHijo1Medife.precios,
//  precioHijo20Medife.precios,
//  precioHijo25Medife.precios,
//  buscar_mi_coeficiente('Medife')
// )

// <! -----------------------------VALOR PRECIO MEDIFE END---------------------------------------------------->

// <! -----------------------------VALOR PRECIO PREVENCION SALUD ---------------------------------------------------->
// <! -----------------------------VALOR PRECIO PREVENCION SALUD END------------------------------------------------->
    


    
     
  let empresas: string[] = [];
  let planesPorEmpresa: { [key: string]: Document[] } = {};

  async function obtenerEmpresasDisponibles() {
    const empresas = await PlanesModel.distinct('empresa');
    return empresas;
  }
  empresas = await obtenerEmpresasDisponibles();
console.log('empresas 297')

console.log(empresas)

  
// Ahora puedes acceder a los resultados por empresa
// console.log(resultados['GBA-Norte']);

// Combinar los planes con precioCalculado

// Define el array de funciones con sus tipos específicos
  let allPlanes = await PlanesModel.find({}); // Consulta a la base de datos para obtener los planes
console.log('allPlanes  todos los polanes: ' +allPlanes)
  const concatenarPrecios = valor_OMINT.concat(valor_SanCor,valor_Premedic,valor_Galeno,valor_Swiss);
  const combinedPlans = functions.combinePlansWithPrices(allPlanes, concatenarPrecios);
console.log('combinedPlans planes combinados : ' +combinedPlans)

  for (const plan of combinedPlans) {
    const empresa = 'planes_' + plan.empresa;
    planesPorEmpresa[empresa] = planesPorEmpresa[empresa] || [];
    planesPorEmpresa[empresa].push(plan);
  }
console.log('planesPorEmpresa PLANES POR EMPRESA : ' + planesPorEmpresa); 


const planesSwiss = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa === 'Swiss Medical');
console.log('PLANES DE SWISS MEDICAL combinados' + planesSwiss)


  const filteredPlansGaleno = combinedPlans.filter((plan: { precio: number; }) => plan.precio > 0);    
  console.log('PLANES DE galeno combinados ' + filteredPlansGaleno)
 // Filtrar los planes con precioCalculado mayor que 0
 const galenoPlanes = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa !== 'GALENO');

 const filteredPlans = combinedPlans.filter((plan: { precio: number; }) => plan.precio > 0);  
  
 const otrasEmpresasPlanes = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa !== 'OMINT');

// Separar en dos arrays: uno para OMINT y otro para las otras empresas
const planesOmint = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa === 'OMINT');

const combinedPlansOmintFiltrados = planesOmint.filter((plan: any) => {
  if (tipo === 'P') {
    if (plan.item_id.endsWith('20') || plan.item_id.endsWith('1500_22') || plan.item_id.endsWith('24') || plan.item_id.endsWith('21')) {
      return false;
    }
    return true;
  }

  if (tipo === 'D') {
    if (plan.item_id.endsWith('1500_21')) {
      return false;
    }
    if (plan.item_id.endsWith('S')) {
      return true;
    }
  }

  return false;
});


let planesOmintAgrupados  = functions.agruparYTransformarPlanes(combinedPlansOmintFiltrados);
const resultadoFinal = otrasEmpresasPlanes.concat(planesOmintAgrupados);
  
  
  
  

   const resultado = combinedPlans.filter((plan: { precio: number; }) => {
     if (tipo === 'P' && plan.precio === 0){
       return false;
       }
       return true;
       });


    
console.log(resultado)

 res.status(200).json(resultado)
      } catch(e) {
        handleHttp(res, 'ERROR_GET_ITEMS');
        
      }
};