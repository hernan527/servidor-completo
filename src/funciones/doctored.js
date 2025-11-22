// <!----------------------Funcion VALOR DEL PLAN PREMEDIC start---------------------------->
import * as functions from './functions';



export function valor_Doctored(
    aporte_OS,
    porcentajeParaAporte,
    numkids,
    precioGrupo,
    precioHijo3,
    grupo
){
let aporteOS = aporte_OS;
let coeficiente = porcentajeParaAporte;
let hijos = numkids;
let precio_Grupo = precioGrupo;
let precio_3hijo = precioHijo3;
let group = grupo;
// console.log('aporteOS   :' + aporteOS);
// console.log('coeficiente   :' + coeficiente);
// console.log('hijos   :' + hijos);
// console.log('precio_Grupo   :' + precio_Grupo);
// console.log('precio_3hijo   :' + precio_3hijo);
// console.log('group   :' + group);
if(group === 1 || group === 3 ){
    hijos = 0;
    precio_3hijo = 0;
}
if(group === 1 || group === 2 ){
    hijos = 0;
    precio_3hijo = 0;
}

let precios = {};
let descOS = functions.calculodescOS(aporteOS[0],aporteOS[2],aporteOS[3],coeficiente,aporteOS[4],aporteOS[5],aporteOS[1])
let array = [];

    if (hijos > 0 ) {
        precios = Object.entries(precioHijo3).reduce((acc, [key, value]) => // tres hijos o mas
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
            }), {
                ...precio_Grupo

            });
    } else {
        precios = precio_Grupo;
    }
//Funcion para el calculo de aportes
//	<!-----------------------Bucle PREMEDIC start------------------------>
    for ( let j in precios) {
        let empresaPlan = [j][0];

        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        // let promo = functions.promoDescuento(precios[j],promocion, conPromo)[2];
        // let descPromo = functions.promoDescuento(precios[j],promo,conPromo)[1];
        let precioTotal = precios[j];

        //funcion para que impacten los descuentos y bonificaciones
        // let precio = functions.final(aporteOS[0],descOS,precioTotal);
        var plan = new Object();
                        plan.item_id = _id;
                        plan.name = 'Doctored ' + nombre;
                        plan.precio = precioTotal;
                        // plan.valorLista = precios[j];
                        // plan.promoPorcentaje = promo;
                        // plan.promoDescuento = descPromo;
                        // plan.valorLista = precios[j];
                        // plan.aporteOS = descOS;
                        array.push(plan);
                    
                    }
    //	<!-----------------------Bucle PREMEDIC end------------------------>								
    // console.log( 'array PREMEDIC')	
    // console.log(array)							
                    
    return array
}			
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC end---------------------------->


