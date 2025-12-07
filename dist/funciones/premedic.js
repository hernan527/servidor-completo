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
exports.valor_Premedic = valor_Premedic;
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC start---------------------------->
const functions = __importStar(require("./functions"));
function valor_Premedic(aportesOS, coeficiente, numHijos, precioAdultos, preciohm_25, preciohm_1, id, con_afinidad, promocion, group) {
    let conPromo = con_afinidad;
    let hijos = numHijos;
    let adultos = precioAdultos;
    let preciohm25 = preciohm_25;
    let preciohm1 = preciohm_1;
    let idprecio = id;
    if (group === 1 || group === 3) {
        hijos = 0;
        preciohm1 = 0;
        preciohm25 = 0;
    }
    let precios = {};
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    let array = [];
    if (idprecio.includes('I') == true) {
        precios = Object.entries(preciohm25).reduce((acc, [key, value]) => // dis hijos o mas
         ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
        }), {
            ...adultos
        });
    }
    else {
        precios = adultos;
    }
    //Funcion para el calculo de aportes
    //	<!-----------------------Bucle PREMEDIC start------------------------>
    for (let j in precios) {
        let empresaPlan = [j][0];
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        let promo = functions.promoDescuento(precios[j], promocion, conPromo)[2];
        let descPromo = functions.promoDescuento(precios[j], promo, conPromo)[1];
        let precioTotal = functions.promoDescuento(precios[j], promo, conPromo)[0];
        //funcion para que impacten los descuentos y bonificaciones
        let precio = functions.final(aportesOS[0], descOS, precioTotal);
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
    return array;
}
// <!----------------------Funcion VALOR DEL PLAN PREMEDIC end---------------------------->
//# sourceMappingURL=premedic.js.map