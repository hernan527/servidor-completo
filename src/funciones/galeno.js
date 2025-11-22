import * as functions from './functions';

export function valor_Galeno(aportesOS,precios,coeficiente) {

	let array = [];
//Funcion para el calculo de aportes
// console.log(aportesOS[0]);
// console.log(aportesOS[2]);
// console.log(aportesOS[3]);

// console.log("coeficiente");
// console.log(coeficiente);
// console.log(aportesOS[4]);
// console.log(aportesOS[5]);
// console.log(aportesOS[1]);


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
						plan.name = 'Galeno  ' + nombre;
						plan.precio = precio;
					 	plan.valorLista = precios[j]
						plan.aporteOS = descOS;
						array.push(plan);					
					}
//	<!-----------------------Bucle GALENO end------------------------>	
	// console.log( 'array Galeno')
	// console.log(array)													
			return array					
}
