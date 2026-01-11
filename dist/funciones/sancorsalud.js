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
exports.valor_SanCor = valor_SanCor;
const functions = __importStar(require("./functions"));
function valor_SanCor(aportesOS, coeficiente, edad_1, edad_2, numHijos, precio_1Hijo, precio_2Hijo, precio_Titular, precios_Conyuge, numhijo_2, grupo_Fam, con_afinidad, promocion, genSanCor) {
    let edad2 = edad_2;
    let hijos = numHijos;
    let preciosConyuge = precios_Conyuge;
    let grupoFam = grupo_Fam;
    // Lógica de limpieza según grupo
    if (grupoFam == 1) {
        edad2 = 0;
        preciosConyuge = 0;
        hijos = 0;
    }
    else if (grupoFam == 2) {
        preciosConyuge = 0;
        edad2 = 0;
    }
    else if (grupoFam == 3) {
        hijos = 0;
    }
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    let array = [];
    let precios = {};
    // 1. Sumar Adultos
    let precio_adultos_Sancor = (edad2 > 17)
        ? Object.entries(preciosConyuge).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_Titular })
        : precio_Titular;
    // 2. Sumar Hijos
    if (hijos == 1) {
        precios = Object.entries(precio_1Hijo).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_adultos_Sancor });
    }
    else if (hijos > 1) {
        let precio_hijos_acum = Object.entries(precio_2Hijo).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value * numhijo_2) }), { ...precio_1Hijo });
        precios = Object.entries(precio_hijos_acum).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_adultos_Sancor });
    }
    else {
        precios = precio_adultos_Sancor;
    }
    // 3. Bucle Final
    for (let j in precios) {
        let otrosBenPrecios = [
            { "col_1": 1, "CS": 22550 }, { "col_1": 2, "CS": 45100 }, { "col_1": 3, "CS": 67650 },
            { "col_1": 4, "CS": 90200 }, { "col_1": 5, "CS": 112750 }, { "col_1": 6, "CS": 135300 }
        ];
        let plan_gen = j.substring(3, 6);
        let nombrePlanBase = functions.planNombre(genSanCor, plan_gen, j.substring(3));
        let promoInfo = functions.promoDescuento(precios[j], promocion, con_afinidad);
        let precioConPromo = promoInfo[0];
        let cuotaSocial = otrosBenPrecios[grupoFam - 1]['CS'];
        let otrosCargos = (nombrePlanBase.includes('5000') || nombrePlanBase.includes('6000'))
            ? parseInt(cuotaSocial) + parseInt(functions.suprasSalud(nombrePlanBase, otrosBenPrecios, grupoFam))
            : parseInt(cuotaSocial);
        let precioFinalConCargos = precioConPromo + otrosCargos;
        let precioFinal = functions.final(aportesOS[0], descOS, precioFinalConCargos);
        array.push({
            item_id: j,
            name: (nombrePlanBase.includes('5000') || nombrePlanBase.includes('6000')) ? 'Exclusive ' + nombrePlanBase : 'SanCor ' + nombrePlanBase,
            precio: precioFinal,
            promoPorcentaje: promoInfo[2],
            promoDescuento: promoInfo[1],
            valorLista: precios[j],
            aporteOS: descOS
        });
    }
    return array;
}
//# sourceMappingURL=sancorsalud.js.map