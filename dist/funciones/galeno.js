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
exports.valor_Galeno = valor_Galeno;
const functions = __importStar(require("./functions"));
function valor_Galeno(aportesOS, precios, coeficiente) {
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
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    for (let j in precios) {
        let empresaPlan = [j][0];
        let _id = empresaPlan;
        let nombre = empresaPlan.substring(3);
        let precioTotal = precios[j];
        // console.log(aportesOS[0])
        // console.log(descOS)
        // console.log(precioTotal)
        //funcion para que impacten los descuentos y bonificaciones
        let precio = functions.final(aportesOS[0], descOS, precioTotal);
        var plan = new Object();
        plan.item_id = _id;
        plan.name = 'Galeno  ' + nombre;
        plan.precio = precio;
        plan.valorLista = precios[j];
        plan.aporteOS = descOS;
        array.push(plan);
    }
    //	<!-----------------------Bucle GALENO end------------------------>	
    // console.log( 'array Galeno')
    // console.log(array)													
    return array;
}
//# sourceMappingURL=galeno.js.map