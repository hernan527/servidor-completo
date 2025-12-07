"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.valor_Omint = valor_Omint;
// <!----------------------Funcion VALOR DEL PLAN OMINT start----------------------------> 
const functions = __importStar(require("./functions"));
function valor_Omint(aportesOS, edad_2, num_Hijos, numhijo_2, precio_titular, precio_conyuge, precio_hijo1, precio_hijo2, edad_ID1OMINT, conPromo, promocion, coeficiente, group) {
    // console.log('aportesOS  : ' + aportesOS);
    // console.log('edad_2  : '+ edad_2);
    // console.log('num_Hijos  : '+ num_Hijos);
    // console.log('numhijo_2  : '+numhijo_2 );
    // console.log('precio_titular  : '+ precio_titular);
    // console.log('precio_conyuge  : '+ precio_conyuge);
    // console.log('precio_hijo1  : '+precio_hijo1 );
    // console.log('precio_hijo2  : '+ precio_hijo2);
    // console.log('edad_ID1OMINT  : '+ edad_ID1OMINT);
    // console.log('conPromo  : '+ conPromo);
    // console.log('promocion  : '+promocion );
    // console.log('coeficiente  : '+ coeficiente);
    // console.log('group  : '+ group);
    let edad2 = edad_2;
    let edadID1OMINT = edad_ID1OMINT;
    let precios = {};
    let precio_adultos_Omint = {};
    //Funcion para el calculo de aportes
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    let hijos = numhijo_2;
    let titular = precio_titular;
    let conyuge = precio_conyuge;
    let hijo_1 = precio_hijo1;
    let hijo_2 = precio_hijo2;
    let numHijos = num_Hijos;
    if (group === 1) {
        hijos = 0;
        numHijos = 0;
        hijo_1 = 0;
        hijo_2 = 0;
        hijos = 0;
        conyuge = 0;
    }
    else if (group === 2) {
        conyuge = 0;
    }
    else if (group === 3) {
        hijos = 0;
        numHijos = 0;
        hijo_1 = 0;
        hijo_2 = 0;
        hijos = 0;
    }
    else { }
    let array = [];
    if (edad2 > 17) {
        precio_adultos_Omint = Object.entries(conyuge).reduce((acc, [key, value]) => // matrimonio
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...titular
        });
    }
    else {
        precio_adultos_Omint = titular;
    }
    if (numHijos == 1) {
        precios = Object.entries(hijo_1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Omint
        });
    }
    else if (numHijos > 1) {
        let precio_hijos_Omint = Object.entries(hijo_2).reduce((acc, [key, value]) => // dis hijos o mas
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
        }), {
            ...hijo_1
        });
        precios = Object.entries(precio_hijos_Omint).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Omint
        });
    }
    else {
        precios = precio_adultos_Omint;
    }
    ;
    if (typeof edadID1OMINT === 'string' && edadID1OMINT.includes('P')) {
        precios = precios;
    }
    // return precios
    // <!---------------------Funcion VALOR DEL PLAN OMINT end----------------------------> 
    for (let j in precios) {
        let empresaPlan = [j][0];
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        let promo = functions.promoDescuento(precios[j], promocion, conPromo)[2];
        let descPromo = functions.promoDescuento(precios[j], promo, conPromo)[1];
        let precioTotal = functions.promoDescuento(precios[j], promo, conPromo)[0];
        let precio = functions.final(aportesOS[0], descOS, precioTotal);
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'OMINT  ' + nombre;
        plan.precio = precio;
        plan.promoPorcentaje = promo;
        plan.promoDescuento = descPromo;
        plan.valorLista = precios[j];
        plan.aporteOS = descOS;
        array.push(plan);
    }
    //	<!-----------------------Bucle OMINT end------------------------>								
    return array;
}
// <!----------------------Funcion VALOR DEL PLAN OMINT end---------------------------->
//# sourceMappingURL=omint.js.map