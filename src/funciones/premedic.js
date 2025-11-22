// <!----------------------Funcion VALOR DEL PLAN PREMEDIC start---------------------------->
import * as functions from './functions';

export function valor_Premedic(
    aportesOS,
    coeficiente,
    numHijos,
    precioAdultos,
    preciohm_25,
    preciohm_1,
    id,
    con_afinidad,
    promocion,
    group){

let conPromo = con_afinidad;
let hijos = numHijos;
let adultos = precioAdultos;
let preciohm25 = preciohm_25;
let preciohm1 = preciohm_1;
let idprecio = id;
if(group === 1 || group === 3 ){
    hijos = 0;
    preciohm1 = 0;
    preciohm25 = 0;
}
let precios = {};
let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])
let array = [];

    if (idprecio.includes('I') == true) {
        precios = Object.entries(preciohm25).reduce((acc, [key, value]) => // dis hijos o mas
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
            }), {
                ...adultos
            });
    } else {
        precios = adultos;
    }
//Funcion para el calculo de aportes
//	<!-----------------------Bucle PREMEDIC start------------------------>
    for ( let j in precios) {
        let empresaPlan = [j][0];

        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        let promo = functions.promoDescuento(precios[j],promocion, conPromo)[2];
        let descPromo = functions.promoDescuento(precios[j],promo,conPromo)[1];
        let precioTotal = functions.promoDescuento(precios[j],promo,conPromo)[0];

        //funcion para que impacten los descuentos y bonificaciones
        let precio = functions.final(aportesOS[0],descOS,precioTotal);
        var plan = new Object();
                        plan.item_id = _id;
                        plan.name = 'Premedic ' + nombre;
                        plan.precio = precio;
                        plan.valorLista = precios[j];
                        plan.promoPorcentaje = promo;
                        plan.promoDescuento = descPromo;
                        plan.valorLista = precios[j];
                        plan.aporteOS = descOS;
                        array.push(plan);
                    
                    }
    //	<!-----------------------Bucle PREMEDIC end------------------------>								
    // console.log( 'array PREMEDIC')	
    // console.log(array)							
                    
    return array
}			
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC end---------------------------->


