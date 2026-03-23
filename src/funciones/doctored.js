// <!----------------------Funcion VALOR DEL PLAN DOCTORED start---------------------------->
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
// galenoPIND25y0h('aporteOS   :',aporteOS);
// galenoPIND25y0h('coeficiente   :',coeficiente);
// galenoPIND25y0h('hijos   :',hijos);
// galenoPIND25y0h('precio_Grupo   :',precio_Grupo);
// galenoPIND25y0h('precio_3hijo   :', precio_3hijo);
// galenoPIND25y0h('group   :', group);
if(group === 1 || group === 3 ){
    hijos = 0;
    precio_3hijo = 0;
}


let precios = {};
let descOS = functions.calculodescOS(aporteOS[0],aporteOS[2],aporteOS[3],coeficiente,aporteOS[4],aporteOS[5],aporteOS[1])
let array = [];

  if (hijos > 2) {
    const cantidadExcedente = hijos - 2; // Ejemplo: Si son 3 hijos, excedente es 1
    
    precios = Object.entries(precio_3hijo).reduce((acc, [key, value]) => {
        // galenoPIND25y0h(`Plan: ${key} | Precio Grupo: ${acc[key]} | Sumando: ${value} x ${cantidadExcedente}`);
        
        return {
            ...acc,
            // Multiplicamos solo por los hijos que sobran de los primeros 2
            [key]: Number(acc[key] || 0) + (Number(value) * cantidadExcedente)
        };
    }, { ...precio_Grupo });
} else {
    precios = precio_Grupo;
}
    // galenoPIND25y0h('preciosgroup   :', precios);
//Funcion para el calculo de aportes
//	<!-----------------------Bucle DOCTORED start------------------------>
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
    //	<!-----------------------Bucle DOCTORED end------------------------>								
    // // galenoPIND25y0h( 'array DOCTORED')	
    // // galenoPIND25y0h(array)							
                    
    return array
}			
// <!----------------------Funcion VALOR DEL PLAN DOCTORED end---------------------------->


