
import { Request, Response } from 'express';
import * as servicios from './index'; 
import * as functions from '../funciones';
import PreciosModel from '../models/precios'; 
import { getProduct } from './precios'
import { handleHttp } from '../utils/error.handle';
import { DefaultSchemaOptions, Document } from 'mongoose';
import { Clinicas } from '../interfaces/clinicas';
import { Empresa } from '../interfaces/empresas';
import ClinicasModel from './../models/clinicas';
import PlanesModel from './../models/planes';
import EmpresaModel from './../models/empresas';
import { Precios } from '../interfaces/precios';
export const  calcularPrecio = async (req: Request, res: Response) => {
 try{
const formCotizar = req.body;
const {group,empresa_prepaga,edad_1,edad_2,numkids,plan_type,tipo,agree,aporteOS,sueldo,aporte,monoadic,cantAport,afinidad,bonAfinidad,supras,segvida,segvida1,region}=formCotizar;
// console.log('formCotizar  : ');// console.log(formCotizar);
let definirPrepaga = 'todas';
if(empresa_prepaga ){
  definirPrepaga = empresa_prepaga;
 } else {
  definirPrepaga = 'todas';
};

interface PlanResultado {
    item_id: string;
    name: string;
    precio: number;
    promoPorcentaje: number;
    promoDescuento: number;
    valorLista: number;
    aporteOS: (number | string)[]; // Indica que el array contiene números o letras
}
let concatenarPrecios: PlanResultado[] = [];
const calcularGrupo = (edad_1: number, edad_2: number, numkids: number, group: string) => {
// console.log('calcularGrupocorriendo' )
  let edad1 = edad_1;
  // console.log('calcularGrupocorriendo edad1',edad1 )

  let edad2 = edad_2;
    // console.log('calcularGrupocorriendo edad2',edad2 )

  let num_kids = numkids;
      // console.log('calcularGrupocorriendo num_kids',num_kids )

  if (group === '1' ) {
    edad2 = 0;
    num_kids = 0;
  } 
  else if ( group === '2'){
    edad2 = 0;
  } else if ( group === '3'){
    num_kids = 0;
  } else {}
  // // if (edad_2 === null) {
  // //   edad2 = 0;
  // // } else if (numkids === null) {
  // //   num_kids = 0;
  // }
        // console.log('calcularGrupocorriendo edad1',edad1 )
        // console.log('calcularGrupocorriendo edad2',edad2 )
        // console.log('calcularGrupocorriendo num_kids',num_kids )
        // console.log('calcularGrupocorriendo group',group )

  let grupo = functions.grupoFamiliar(edad1, edad2, num_kids, group);
          // console.log('calcularGrupocorriendo grupo',grupo )

  return grupo;
};
// Llamada a la función para obtener el grupo
const grupo = calcularGrupo(edad_1, edad_2, numkids, group);
// console.log(' INICIANDO COTIZACION ')
// console.log('grupo ', grupo)
  const porcentaje: { [nombreEmpresa: string]: number } = {};
  const beneficiariosF184 = cantAport;
  // console.log('beneficiariosF184 ', beneficiariosF184)

  const eleccionSueldoOAporte = aporteOS;
    // console.log('eleccionSueldoOAporte ', eleccionSueldoOAporte)

  const sueldoSueldoOAporte = sueldo;
    // console.log('sueldoSueldoOAporte ', sueldoSueldoOAporte)
  const categoria_Mono = "";
    // console.log('categoria_Mono ', categoria_Mono)

    let numhijo2 = grupo[2]; //checked
    // console.log('numhijo2 ', numhijo2)

    let numHijos = grupo[3]; //checked
    // console.log('numHijos ', numHijos)

    let gen = grupo[4]; //checked
    // console.log('gen ', gen)

    let grupoFam = grupo[5];
    // console.log('grupoFam ', grupoFam)

    let tipo_IngresoPDMI = functions.tipoAsociado(tipo);
// console.log('tipo_IngresoPDMI :',tipo_IngresoPDMI)
// <! ----------SANCOR---------------------------------------------------->
let idSancor = functions.productID(edad_1, tipo, gen, 'titular', numHijos,group);
// console.log('idSancor :',idSancor)

let idSancor1 = functions.productID(edad_2, tipo, gen, 'conyuge', numHijos,group);
// console.log('idSancor1 :',idSancor1)

let idSancorConyuge: string
if (grupo[0] == 2) {
  idSancorConyuge = idSancor1[1];
// console.log(idSancorConyuge)
}else {idSancorConyuge
  =idSancor[0]}
// console.log('idSancorConyuge ',idSancorConyuge)
// <! -----------------------------OMINT---------------------------------------------------->
let idOmint =  functions.productIdOmint(edad_1, tipo, 'titular',group);
// <! -----------------------------GALENO--------------------------------------------------->
let idGaleno = functions.productIdGaleno(edad_1, edad_2, tipo, numHijos,group);
// <! ----------PREMEDIC-------------------------------------------------------------------->
let edadIdPremedic = functions.productIdPremedic(edad_1, edad_2, tipo, numHijos,group);
// <! ----------SWISS----------------------------------------------------------------------->
let idTitularSwiss = functions.productIdSwiss(edad_1, tipo_IngresoPDMI,group);
let idConyugeSwiss = functions.productIdSwiss(edad_2, tipo_IngresoPDMI,group);

// <! ----------MEDIFE---------------------------------------------------->
let idAdultosMedife = functions.productIdMedife(edad_1,edad_1, tipo_IngresoPDMI);
// <! ----------PREVENCION---------------------------------------------------->
let idPrevencion = functions.productIdPrevencion(edad_1,edad_1, grupo[3], tipo_IngresoPDMI);
// <! ----------DOCTORED---------------------------------------------------->
let IdDoctored = functions.productIdDoctored(edad_1, edad_2, tipo_IngresoPDMI, grupo[3],group);
// <! ----------AVALIAN---------------------------------------------------->
let IdsAvalian = functions.productIdAvalian(edad_1, edad_2, tipo_IngresoPDMI, group);
// <! ----------CRISTAL y RAS---------------------------------------------------->
// let idsCristalyRas = functions.productIdRasCristal(edad_1, edad_2, tipo_IngresoPDMI, group);  
// // <! ----------LUIS PASTEUR---------------------------------------------------->
// let idsLuisPasteur = functions.productIdLuisPasteur(edad_1, edad_2,grupo[3], tipo_IngresoPDMI, group)
// // <! ----------ASMEPRIV---------------------------------------------------->
// let idsAsmepriv = functions.productIdAsmepriv(edad_1, edad_2,grupo[3], tipo_IngresoPDMI, group)
// // <! ----------BAYRES PLAN---------------------------------------------------->
// let idsBayresPlan = functions.productIBayres(edad_1, edad_2, group)
// // <! ----------HOMINIS---------------------------------------------------->
// let idsHominis = functions.productIdHominis(edad_1, edad_2, tipo_IngresoPDMI, grupo[3], group)


async function fetchProductPrice(id: string) {
  // console.log( ' funcion en linea 183 : id: ', id)
 return await getProduct(id);
}

const companies = await EmpresaModel.find({});
  
  
const empresasConCoeficientes = companies.map(empresa => {
  return { [empresa.name]: empresa.factores.coeficiente };
});

const arrayValorMonotXCategoria = companies.map(empresa => {
  return { [empresa.name]: empresa.factores.mono };
});
    const aporte_OS = [tipo_IngresoPDMI,beneficiariosF184,eleccionSueldoOAporte,sueldoSueldoOAporte,categoria_Mono,arrayValorMonotXCategoria]


// console.log('Coeficientes de todas las empresas:', empresasConCoeficientes);
// Acceder al coeficiente de una empresa en particular por su nombre
async function buscar_mi_coeficiente(type:string){
const coeficiente = empresasConCoeficientes.find(empresa => empresa[type]);
if (coeficiente) {
return coeficiente  
} else {
// console.log(`No se encontró la empresa ${type}.`);
}

}
async function fetchPrices() {
  const prices: { [key: string]: any } = {};

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
      { variable: 'precioSanCor1Hijo', id: idSancor[2] },
      { variable: 'precioSanCor2Hijo', id: idSancor[3] },
      { variable: 'precioSanCorTitular', id: idSancor[0] },
      { variable: 'precioConyugeSanCor', id: idSancorConyuge },
      { variable: 'priceGrupoGaleno', id: 'galeno' + idGaleno },
      { variable: 'precioMedifeAdultos', id: idAdultosMedife },
      { variable: 'precioMedifeHijo0a1', id: 'medife' + tipo_IngresoPDMI + 'HIJO0a1' },
      { variable: 'precioMedifeHijo0a20', id: 'medife' + tipo_IngresoPDMI + 'HIJO2a20' },
      { variable: 'precioMedifeHijo0a25', id: 'medife' + tipo_IngresoPDMI + 'HIJO25' },
      { variable: 'precioPrevencion', id: 'prevencion' + idPrevencion },
      { variable: 'precioDoctoredGrupo', id:  IdDoctored[0] },
      { variable: 'precioDoctoredHijo3', id:  IdDoctored[1] },
      { variable: 'precioDoctoredAd', id:  IdDoctored[2] },
      { variable: 'precioAvalianTitular', id: IdsAvalian[0] },
      { variable: 'precioAvalianConyuge', id: IdsAvalian[1] },
      { variable: 'precioAvalianHijo1', id:  IdsAvalian[2] },
      { variable: 'precioAvalianHijo2', id:  IdsAvalian[3] },
      { variable: 'precioAvalianHijo3', id:  IdsAvalian[4] },
      { variable: 'precioAvalianHijo25', id:  IdsAvalian[5] },
      // { variable: 'precioTitularRas', id: idsCristalyRas[0] },
      // { variable: 'precioConyugeRas', id: idsCristalyRas[1] },
      // { variable: 'precioHijo1Ras', id: idsCristalyRas[2] },
      // { variable: 'precioHijo2Ras', id: idsCristalyRas[3] },
      // { variable: 'precioHijo3Ras', id: idsCristalyRas[4] },
      // { variable: 'precioTitularCristal', id:  idsCristalyRas[5] },
      // { variable: 'precioConyugeCristal', id:  idsCristalyRas[6] },
      // { variable: 'precioHijo1Cristal', id:  idsCristalyRas[7] },
      // { variable: 'precioHijo2Cristal', id:  idsCristalyRas[8] },
      // { variable: 'precioHijo3Cristal', id:  idsCristalyRas[9] },
      // { variable: 'precioLuispasteurAdultos', id:  idsLuisPasteur[0] },
      // { variable: 'precioLuispasteurNieto', id:  idsLuisPasteur[1] },
      // { variable: 'precioLuispasteurAdicional', id:  idsLuisPasteur[2] },
      // { variable: 'precioLuispasteurHijo', id:  idsLuisPasteur[3] },
      // { variable: 'precioAsmepriv', id:  idsAsmepriv[0] },
      // { variable: 'precioAdmenorUno', id:  idsAsmepriv[1] },
      // { variable: 'precioAsmeprivHijoHasta21', id:  idsAsmepriv[2] },
      // { variable: 'precioAsmeprivRecargoHijo21a29', id:  idsAsmepriv[3] },
      // { variable: 'precioAsmeprivModuloMat', id:  idsAsmepriv[4] },
      // { variable: 'precioBayresAdultos', id:  idsBayresPlan[0] },
      // { variable: 'precioBayresHijoHasta25', id:  idsBayresPlan[1] },
      // { variable: 'precioBayresAd18a49', id:  idsBayresPlan[2] },
      // { variable: 'precioBayresJovenSinMaternidad', id:  idsBayresPlan[3] },
      // { variable: 'precioBayresInd18a29', id:  idsBayresPlan[4] },
      // { variable: 'precioHominis', id:  idsHominis }      
       ];


  const promises = productQueries.map(async (query) => {
      // console.log(`Fetching price for ${query.variable} with ID: ${query.id}`);
      try {
          const result = await fetchProductPrice(query.id);
          // console.log(query.id,' :',result )
          return { [query.variable]: result };
      } catch (error) {
          // console.error(`Error fetching price for ${query.id}:`, error);
          // console.log(query.id,' :',error )
          return { [query.variable]: null };
      }
  });

  const results = await Promise.all(promises);
  results.forEach((result) => Object.assign(prices, result));
  return prices;
}

   const prices = await fetchPrices();
   // console.log('prices',prices);

// console.log(' prices ' ,prices)

// console.log('aporte_OS  : ' + aporte_OS);
// console.log('edad_2  : '+ edad_2);
// console.log('numHijos  : '+ numHijos);
// console.log('numhijo2  : '+numhijo2 );
// console.log('precio_titular  : '+ prices.precio_titular_Omint.precios);
// console.log('precio_conyuge  : '+ prices.precio_conyuge_Omint.precios);
// console.log('precio_hijo1  : '+prices.precio_hijo1_Omint.precios );
// console.log('precio_hijo2  : '+ prices.precio_hijo2_Omint.precios);
// console.log('edad_ID1OMINT  : '+ idOmint[0]);
// console.log('conPromo  : '+ afinidad);
// console.log('promocion  : '+bonAfinidad );
// console.log('coeficiente  : '+ buscar_mi_coeficiente('OMINT'));
// console.log('group  : '+ group);

// async function buscarPrecio(id: string) {
//     try {
//         const doc = await PreciosModel.findOne({ id });

//         if (!doc) {
//             console.log(`⚠️ No se encontró el documento con id: ${id}`);
//             return { precios: 0 }; // Valor por defecto
//         }

//         return doc;
//     } catch (error) {
//         // console.error(`❌ Error al buscar precios con id ${id}:`, error);
//         return { precios: 0 };     // Valor por defecto para evitar que falle
//     }
// }

// prices.precioPrevencion = await buscarPrecio(idPrevencion);
// prices.precioDoctoredGrupo = await buscarPrecio(IdDoctored[0]);
// prices.precioDoctoredHijo3 = await buscarPrecio(IdDoctored[1]);
// prices.precioDoctoredAd = await buscarPrecio(IdDoctored[2]);

// prices.precioMedifeAdultos = await buscarPrecio(idAdultosMedife);
// prices.precioMedifeHijo0a1 = await buscarPrecio('medife'+tipo_IngresoPDMI+'HIJO0a1');
// prices.precioMedifeHijo0a20 = await buscarPrecio('medife'+tipo_IngresoPDMI+'HIJO2a20');
// prices.precioMedifeHijo0a25 = await buscarPrecio('medife'+tipo_IngresoPDMI+'HIJO25');

// prices.precioAvalianTitular = await buscarPrecio(IdsAvalian[0]);
// prices.precioAvalianConyuge = await buscarPrecio(IdsAvalian[1]);
// prices.precioAvalianHijo1 = await buscarPrecio(IdsAvalian[2]);
// prices.precioAvalianHijo2 = await buscarPrecio(IdsAvalian[3]);
// prices.precioAvalianHijo3 = await buscarPrecio(IdsAvalian[4]);
// prices.precioAvalianHijo25 = await buscarPrecio(IdsAvalian[5]);

// prices.precioTitularRas = await buscarPrecio(idsCristalyRas[0]);
// if(group == 3 || group == 4) {
//     prices.precioConyugeRas = await buscarPrecio(idsCristalyRas[1]);
// }
// prices.precioHijo3Ras = await buscarPrecio(idsCristalyRas[2]);
// prices.precioHijo2Ras = await buscarPrecio(idsCristalyRas[3]);
// prices.precioHijo1Ras = await buscarPrecio(idsCristalyRas[4]);

// prices.precioTitularCristal = await buscarPrecio(idsCristalyRas[5]);
// if(group == 3 || group == 4) {
//     prices.precioConyugeCristal = await buscarPrecio(idsCristalyRas[6]);
// }
// prices.precioHijo3Cristal = await buscarPrecio(idsCristalyRas[7]);
// prices.precioHijo2Cristal = await buscarPrecio(idsCristalyRas[8]);
// prices.precioHijo1Cristal = await buscarPrecio(idsCristalyRas[9]);

// prices.precioLuispasteurAdultos = await buscarPrecio(idsLuisPasteur[0]);
// prices.precioLuispasteurNieto = await buscarPrecio(idsLuisPasteur[1]);
// prices.precioLuispasteurAdicional = await buscarPrecio(idsLuisPasteur[2]);
// prices.precioLuispasteurHijo = await buscarPrecio(idsLuisPasteur[3]);

// prices.precioAsmepriv = await buscarPrecio(idsAsmepriv[0]);
// prices.precioAdmenorUno = await buscarPrecio(idsAsmepriv[1]);
// prices.precioAsmeprivHijoHasta21 = await buscarPrecio(idsAsmepriv[2]);
// prices.precioAsmeprivRecargoHijo21a29 = await buscarPrecio(idsAsmepriv[3]);

// prices.precioBayresAdultos = await buscarPrecio(idsBayresPlan[0]);
// prices.precioBayresHijoHasta25 = await buscarPrecio(idsBayresPlan[1]);
// prices.precioBayresAd18a49 = await buscarPrecio(idsBayresPlan[2]);
// prices.precioBayresJovenSinMaternidad = await buscarPrecio(idsBayresPlan[3]);
// prices.precioBayresInd18a29 = await buscarPrecio(idsBayresPlan[4]);

// prices.precioHominis = await buscarPrecio(idsHominis);

// async function cargarPrecios(lista: string[][], prices: { [x: string]: (Document<unknown, {}, Precios, {}, DefaultSchemaOptions> & Precios & Required<{ _id: string; }> & { __v: number; }) | { precios: number; }; }) {
//     for (const [nombre, id] of lista) {
//       // console.log('lista',lista)
//         prices[nombre] = await buscarPrecio(id);
//     }
// }
// const listaDePrecios = [
//     ["precioPrevencion", idPrevencion],

//     ["precioDoctoredGrupo", IdDoctored[0]],
//     ["precioDoctoredHijo3", IdDoctored[1]],
//     ["precioDoctoredAd", IdDoctored[2]],

//     ["precioMedifeAdultos", idAdultosMedife],
//     ["precioMedifeHijo0a1", `medife${tipo_IngresoPDMI}HIJO0a1`],
//     ["precioMedifeHijo0a20", `medife${tipo_IngresoPDMI}HIJO2a20`],
//     ["precioMedifeHijo0a25", `medife${tipo_IngresoPDMI}HIJO25`],

//     ["precioAvalianTitular", IdsAvalian[0]],
//     ["precioAvalianConyuge", IdsAvalian[1]],
//     ["precioAvalianHijo1", IdsAvalian[2]],
//     ["precioAvalianHijo2", IdsAvalian[3]],
//     ["precioAvalianHijo3", IdsAvalian[4]],
//     ["precioAvalianHijo25", IdsAvalian[5]],

    // ["precioTitularRas", idsCristalyRas[0]],
    // ["precioConyugeRas", idsCristalyRas[1]],
    // ["precioHijo1Ras", idsCristalyRas[4]],
    // ["precioHijo2Ras", idsCristalyRas[3]],
    // ["precioHijo3Ras", idsCristalyRas[2]],

    // ["precioTitularCristal", idsCristalyRas[5]],
    // ["precioConyugeCristal", idsCristalyRas[6]],
    // ["precioHijo1Cristal", idsCristalyRas[9]],
    // ["precioHijo2Cristal", idsCristalyRas[8]],
    // ["precioHijo3Cristal", idsCristalyRas[7]],

    // ["precioLuispasteurAdultos", idsLuisPasteur[0]],
    // ["precioLuispasteurNieto", idsLuisPasteur[1]],
    // ["precioLuispasteurAdicional", idsLuisPasteur[2]],
    // ["precioLuispasteurHijo", idsLuisPasteur[3]],

    // ["precioAsmepriv", idsAsmepriv[0]],
    // ["precioAdmenorUno", idsAsmepriv[1]],
    // ["precioAsmeprivHijoHasta21", idsAsmepriv[2]],
    // ["precioAsmeprivRecargoHijo21a29", idsAsmepriv[3]],

    // ["precioBayresAdultos", idsBayresPlan[0]],
    // ["precioBayresHijoHasta25", idsBayresPlan[1]],
    // ["precioBayresAd18a49", idsBayresPlan[2]],
    // ["precioBayresJovenSinMaternidad", idsBayresPlan[3]],
    // ["precioBayresInd18a29", idsBayresPlan[4]],

    // ["precioHominis", idsHominis]
// ];
const precios = {};

// await cargarPrecios(listaDePrecios, precios);


// <! -----------------------------ID PREMEDIC START---------------------------------------------------->
function hayPreciosValidos(precios: any[]): boolean {
  // // console.log("Verificando precios:", precios); // Para depuración
  
  // Verificamos que los precios no sean null ni undefined
  return precios.every(p => p !== null && p !== undefined);
}

let valor_Omint :any=[];
let valor_SanCor:any=[];
let valor_Premedic:any=[];
let valor_Galeno:any=[];
let valor_Swiss:any=[];
let valor_Doctored:any=[];
let valor_Prevencion:any=[];
let valor_Avalian:any=[];
let valor_Medife:any=[];
// let valor_Ras:any=[];
// let valor_Cristal:any=[];
// let valor_Asmepriv:any=[];
// let valor_LuisPasteur:any=[];
// let valor_BayresPlan:any=[];


// --- BLOQUE OMINT ---
try {
  if (hayPreciosValidos([prices.precio_titular_Omint.precios,
  prices.precio_conyuge_Omint.precios,
  prices.precio_hijo1_Omint.precios,
  prices.precio_hijo2_Omint.precios]) && (empresa_prepaga === 'todas' || empresa_prepaga === 'omint')) {
    
    const argsOmint = [aporte_OS,edad_2,numHijos,numhijo2,prices.precio_titular_Omint.precios,prices.precio_conyuge_Omint.precios,prices.precio_hijo1_Omint.precios,prices.precio_hijo2_Omint.precios,idOmint[0],afinidad,bonAfinidad,buscar_mi_coeficiente('OMINT'),group];
// console.log('argsOmint :',argsOmint);
    valor_Omint = functions.valor_Omint(...argsOmint);
    concatenarPrecios = [...concatenarPrecios, ...valor_Omint];
// console.log('valor_Omint ',valor_Omint);
}} catch (error) {
  console.error(`❌ Error calculando OMINT para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}

  // --- BLOQUE PREMEDIC---
try {
  if (hayPreciosValidos([
  prices.priceAdultosPr.precios,
  prices.pricePrHijoMenir25.precios,
  prices.pricePrHijoMenir1.precios]) && (empresa_prepaga === 'premedic' || empresa_prepaga === 'premedic')) {
    const argsPremedic = [aporte_OS,buscar_mi_coeficiente('Premedic'),grupo[3],prices.priceAdultosPr.precios,prices.pricePrHijoMenir25.precios,prices.pricePrHijoMenir1.precios,edadIdPremedic,afinidad,bonAfinidad,group];
// console.log('argsPremedic :',argsPremedic);
valor_Premedic = functions.valor_Premedic(...argsPremedic);
// console.log('valor_Premedic',valor_Premedic);
concatenarPrecios = [...concatenarPrecios, ...valor_Premedic];
  }
} catch (error) {
  console.error(`❌ Error calculando Premedic para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}
  // --- BLOQUE SANCOR SALUD  ---
try {
  if (hayPreciosValidos([prices.precioSanCor1Hijo.precios,
  prices.precioSanCor2Hijo.precios,
  prices.precioSanCorTitular.precios,
  prices.precioConyugeSanCor.precios])  && (empresa_prepaga === 'todas' || empresa_prepaga === 'sancor') ) {


    
// CORREGIDO: Se agregaron paréntesis y argumentos faltantes
const argsSanCor = [
    aporte_OS, 
    await buscar_mi_coeficiente('SanCor Salud'), 
    edad_1, 
    edad_2, 
    grupo[3], 
    prices.precioSanCor1Hijo.precios, 
    prices.precioSanCor2Hijo.precios, 
    prices.precioSanCorTitular.precios, 
    prices.precioConyugeSanCor.precios, 
    numhijo2, 
    grupoFam, 
    afinidad, 
    bonAfinidad, 
    gen
];
// console.log('argsSanCor :',argsSanCor);
    valor_SanCor = functions.valor_SanCor(...argsSanCor);
// console.log('valor_SanCor',valor_SanCor);
concatenarPrecios = [...concatenarPrecios, ...valor_SanCor];
  }
 } catch (error) {
  console.error(`❌ Error calculando Sancor Salud para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
} 
// ... dentro de calcularPrecio ...

try {
// 1. Convertimos o aseguramos que numHijos sea un número para evitar el error TS2365
const numHijosNumerico = Number(grupo[3]); 

// 2. Definimos la condición con el tipo correcto
const esGrupoJovenNumeroso = (edad_1 <= 25 && edad_2 <= 25 && numHijosNumerico > 2);

// console.log(`--- Verificación Galeno ---`);
// console.log(`Edad1: ${edad_1}, Edad2: ${edad_2}, Hijos: ${numHijosNumerico}`);
// console.log(`¿Es grupo joven numeroso?: ${esGrupoJovenNumeroso}`);

if (esGrupoJovenNumeroso) {
    // console.log("Saliendo de Galeno: No aplica para grupos jóvenes con más de 2 hijos.");
} else {
  
   // --- BLOQUE GALENO ---

  if (hayPreciosValidos([prices.priceGrupoGaleno?.precios]) && (empresa_prepaga === 'todas' || empresa_prepaga === 'galeno')) {
        const argsGaleno = [
            aporte_OS, 
            prices.priceGrupoGaleno.precios, 
            await buscar_mi_coeficiente('Galeno')
        ];
        valor_Galeno = functions.valor_Galeno(...argsGaleno);
        // console.log(`✅ Galeno calculado: ${valor_Galeno.length} planes`);
concatenarPrecios = [...concatenarPrecios, ...valor_Galeno];
    } else {
        // console.log("⚠️ Galeno: No hay precios válidos en DB.");
    }
    
}
 } catch (error) {
  console.error(`❌ Error calculando Galeno para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}
   // --- BLOQUE SWISS MEDICAL ---
try {
  if (hayPreciosValidos([prices.precioTitularSwiss.precios,
prices.precioConyugeSwiss.precios,
prices.precioHijo1Swiss.precios,
prices.precioHijo2Swiss.precios])  && (empresa_prepaga === 'todas' || empresa_prepaga === 'swiss')) {
  const argsSwiss = [aporte_OS,edad_2,grupo[3],numhijo2,prices.precioTitularSwiss.precios,prices.precioConyugeSwiss.precios,prices.precioHijo1Swiss.precios,prices.precioHijo2Swiss.precios,buscar_mi_coeficiente('Swiss Medical'),group];
// console.log('argsSwiss :',argsSwiss);
valor_Swiss = functions.valor_Swiss(...argsSwiss);
concatenarPrecios = [...concatenarPrecios, ...valor_Swiss];
// console.log('valor_Swiss',valor_Swiss);
}
} catch (error) {
  console.error(`❌ Error calculando Swiss Medical para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}
   // --- BLOQUE DOCTORED ---
try {
  if (hayPreciosValidos([prices.precioDoctoredGrupo.precios,prices.precioDoctoredHijo3.precios])  && (empresa_prepaga === 'todas' || empresa_prepaga === 'doctored')) {
 
const argsDoctored = [aporte_OS,buscar_mi_coeficiente('Doctored'),grupo[3],prices.precioDoctoredGrupo.precios,prices.precioDoctoredHijo3.precios,group];
// console.log('argsDoctored :',argsDoctored);
  valor_Doctored = functions.valor_Doctored(...argsDoctored);
concatenarPrecios = [...concatenarPrecios, ...valor_Doctored];
// console.log('valor_Doctored',valor_Doctored);
}
} catch (error) {
  console.error(`❌ Error calculando Doctored para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}
   // --- BLOQUE PREVENCION SALUD ---
try {
  if (hayPreciosValidos([prices.precioPrevencion.precios])  && (empresa_prepaga === 'todas' || empresa_prepaga === 'prevencion')) {

const argsPrevencion = [aporte_OS,buscar_mi_coeficiente('Prevencion'),grupo[3],prices.precioPrevencion.precios,group];
// console.log('argsPrevencion :',argsPrevencion);
  valor_Prevencion = functions.valor_Prevencion(...argsPrevencion);
  concatenarPrecios = [...concatenarPrecios, ...valor_Prevencion];

// console.log('valor_Prevencion',valor_Prevencion);
}
} catch (error) {
  console.error(`❌ Error calculando Prevencion Salud para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}

   // --- BLOQUE AVALIAN ---
try {
  if (hayPreciosValidos([prices.precioAvalianTitular.precios,prices.precioAvalianConyuge.precios,prices.precioAvalianHijo1.precios,prices.precioAvalianHijo2.precios,prices.precioAvalianHijo3.precios,prices.precioAvalianHijo25.precios])  && (empresa_prepaga === 'todas' || empresa_prepaga === 'avalian') ) {

const argsAvalian = [aporte_OS,buscar_mi_coeficiente('Avalian'),group, bonAfinidad, prices.precioAvalianTitular.precios,prices.precioAvalianConyuge.precios,prices.precioAvalianHijo1.precios,prices.precioAvalianHijo2.precios,prices.precioAvalianHijo3.precios,grupo[3]];

// console.log('argsAvalian :',argsAvalian);
  valor_Avalian = functions.valor_Avalian(...argsAvalian);
  concatenarPrecios = [...concatenarPrecios, ...valor_Avalian];
// console.log('valor_Avalian ',valor_Avalian);
  
}
} catch (error) {
  console.error(`❌ Error calculando Avalian para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}
// if (hayPreciosValidos([prices.precioTitularRas.precios, prices.precioConyugeRas.precios, prices.precioHijo1Ras.precios, prices.precioHijo2Ras.precios, prices.precioHijo3Ras.precios])) {
// const argsRas = [aporte_OS,buscar_mi_coeficiente('Ras'), group, bonAfinidad, prices.precioTitularRas.precios, prices.precioConyugeRas.precios, prices.precioHijo1Ras.precios, prices.precioHijo2Ras.precios, prices.precioHijo3Ras.precios];
// console.log('argsRas :',argsRas);
//   valor_Ras = functions.valor_Ras(...argsRas);
// console.log('valor_Ras ',valor_Ras);
// }
// if (hayPreciosValidos([prices.precioTitularCristal.precios, prices.precioConyugeCristal.precios, prices.precioHijo1Cristal.precios, prices.precioHijo2Cristal.precios, prices.precioHijo3Cristal.precios])) {
// const argsCristal = [aporte_OS,buscar_mi_coeficiente('Cristal'), group, bonAfinidad, prices.precioTitularCristal.precios, prices.precioConyugeCristal.precios, prices.precioHijo1Cristal.precios, prices.precioHijo2Cristal.precios, prices.precioHijo3Cristal.precios];
// console.log('argsCristal :',argsCristal);
//   valor_Cristal = functions.valor_Cristal(...argsCristal);
// console.log('valor_Cristal ',valor_Cristal);
// }
// if (hayPreciosValidos([prices.precioAsmepriv.precios, prices.precioAdmenorUno.precios, prices.precioAsmeprivHijoHasta21.precios, prices.precioAsmeprivRecargoHijo21a29.precios])) {
// const argsAsmepriv = [aporte_OS,buscar_mi_coeficiente('Asmepriv'), group, bonAfinidad, prices.precioAsmepriv.precios, prices.precioAdmenorUno.precios, prices.precioAsmeprivHijoHasta21.precios, prices.precioAsmeprivRecargoHijo21a29.precios];
// console.log('argsAsmepriv :',argsAsmepriv);
//   valor_Asmepriv = functions.valor_Asmepriv(...argsAsmepriv);
// console.log('valor_Asmepriv ',valor_Asmepriv);
// }
// if (hayPreciosValidos([prices.precioLuispasteurAdultos.precios, prices.precioLuispasteurNieto.precios, prices.precioLuispasteurAdicional.precios, prices.precioLuispasteurHijo.precios ])) {

// const argsLuispasteur = [aporte_OS,buscar_mi_coeficiente('Luispasteur'), group, bonAfinidad, prices.precioLuispasteurAdultos.precios, prices.precioLuispasteurNieto.precios, prices.precioLuispasteurAdicional.precios, prices.precioLuispasteurHijo.precios];
// console.log('argsLuispasteur :',argsLuispasteur);
//   valor_LuisPasteur = functions.valor_Luispasteur(...argsLuispasteur);
// console.log('valor_LuisPasteur ',valor_LuisPasteur);
// }
// if (hayPreciosValidos([prices.precioBayresAdultos.precios, prices.precioBayresHijoHasta25.precios, prices.precioBayresAd18a49.precios, prices.precioBayresJovenSinMaternidad.precios, prices.precioBayresInd18a29.precios ])) {

// const argsBayresplan = [aporte_OS,buscar_mi_coeficiente('Bayresplan'), group, bonAfinidad, prices.precioBayresAdultos.precios, prices.precioBayresHijoHasta25.precios, prices.precioBayresAd18a49.precios, prices.precioBayresJovenSinMaternidad.precios, prices.precioBayresInd18a29.precios];
// console.log('argsBayresplan :',argsBayresplan);
//   valor_BayresPlan = functions.valor_Bayresplan(...argsBayresplan);
// console.log('valor_BayresPlan ',valor_BayresPlan);
// }




   // --- BLOQUE MEDIFE ---
try {
  if (hayPreciosValidos([prices.precioMedifeAdultos.precios,  prices.precioMedifeHijo0a20.precios ])  && (empresa_prepaga === 'todas' || empresa_prepaga === 'medife')) {
// console.log('prices.precioMedifeAdultos.precios : ',prices.precioMedifeAdultos.precios);
// console.log('prices.precioMedifeHijo0a20.precios : ',prices.precioMedifeHijo0a20.precios);

const argsMedife = [aporte_OS,grupo[3],prices.precioMedifeAdultos.precios, prices.precioMedifeHijo0a20.precios,buscar_mi_coeficiente('Medife')];
// console.log('argsMedife :',argsMedife);
  valor_Medife = functions.valor_Medife(...argsMedife);
  concatenarPrecios = [...concatenarPrecios, ...valor_Medife];
}

} catch (error) {
  console.error(`❌ Error calculando Medife para ID ${group}:`, error.message);
  // No hacemos nada, dejamos que siga con la siguiente prepaga
}


for ( let i=0 ; i < prices.length ; i++){
// console.log(prices[i])
}

let empresas: string[] = [];
let planesPorEmpresa: { [key: string]: Document[] } = {};

async function obtenerEmpresasDisponibles() {
    empresas = await PlanesModel.distinct('empresa');
    return empresas;
  }
empresas = await obtenerEmpresasDisponibles();
// console.log('empresas : ' + empresas)
let allPlanes = await PlanesModel.find({}); // Consulta a la base de datos para obtener los planes
// console.log('allPlanes : ')  
// console.log(allPlanes)

  const combinedPlans = functions.combinePlansWithPrices(allPlanes, concatenarPrecios);
// console.log('combinedPlans :')
// console.log(combinedPlans)

  for (const plan of combinedPlans) {
    const empresa = 'planes_' + plan.empresa;
    planesPorEmpresa[empresa] = planesPorEmpresa[empresa] || [];
    planesPorEmpresa[empresa].push(plan);
  }

const planesSwiss = combinedPlans.filter((plan: { empresa: string; }) => plan.empresa === 'Swiss Medical');
const filteredPlansGaleno = combinedPlans.filter((plan: { precio: number; }) => plan.precio > 0);    
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
  // console.log(' FINALIZANDO COTIZACION ')

// console.log('concatenarPrecios   :');
// console.log(concatenarPrecios);
 res.status(200).json(concatenarPrecios);
      } catch(e) {
        handleHttp(res, 'ERROR_GET_ITEMS'); 
      }
};