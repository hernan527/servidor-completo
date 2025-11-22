import * as functions from './functions';

export function valor_Prevencion(
    aporte_OS,
    coeficiente,
    grupo,
    precioPrevencion,
    group
){
   let aportesOS = aporte_OS
   let mi_coeficiente = coeficiente;
   let grup = grupo;
   let precios = precioPrevencion;
   let grou = group;
   
   let array = [];
   let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])



   for ( let j in precios) {
    let empresaPlan = [j][0];
    let _id = empresaPlan;
    let nombre = empresaPlan.substring(3);
    let precioTotal = precios[j];
 
 // console.log(aportesOS[0])
 // console.log(descOS)
 // console.log(precioTotal)
 
 
    //funcion para que impacten los descuentos y bonificaciones
    let precio = functions.final(aportesOS[0],descOS,precioTotal);
 
     var plan = new Object();
                         plan.item_id = _id;
                         plan.name = 'Prevencion-Salud  ' + nombre;
                         plan.precio = precio;
                         plan.valorLista = precios[j]
                         plan.aportesOS = descOS;
                         array.push(plan);					
                     }
 //	<!-----------------------Bucle GALENO end------------------------>	
     // console.log( 'array Galeno')
     // console.log(array)													
             return array					
 }
 
