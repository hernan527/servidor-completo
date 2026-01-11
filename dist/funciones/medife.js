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
exports.valor_Medife = valor_Medife;
const functions = __importStar(require("./functions"));
function valor_Medife(aportesOS, numkids, // Cantidad total de hijos (0 a 21 años)
precioTitularMedife, // Ya incluye Adulto 1 + Adulto 2 (si hay)
precioHijoMedife, // Precio estándar para el rango 0-21 años
coeficienteMedife) {
    console.log("--- INICIO CÁLCULO MEDIFÉ ---");
    console.log('aportesOS :', aportesOS);
    let tipo_de_socio = aportesOS[0];
    let con_afinidad = true;
    console.log(`Hijos: ${numkids} | Afinidad: ${con_afinidad} | Tipo Socio: ${tipo_de_socio}`);
    let array = [];
    // 1. Cálculo de Descuento de Obra Social
    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficienteMedife, aportesOS[4], aportesOS[5], aportesOS[1]);
    console.log("Descuento OS (Aportes):", descOS);
    // 2. Sumar Hijos al precio base de Adultos
    let preciosAcumulados = { ...precioTitularMedife };
    if (numkids > 0 && precioHijoMedife) {
        preciosAcumulados = Object.entries(precioHijoMedife).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: (acc[key] || 0) + (parseInt(value) * parseInt(numkids))
        }), preciosAcumulados);
        console.log("Precios con hijos sumados (Lista):", preciosAcumulados);
    }
    else {
        console.log("No se sumaron hijos (numkids = 0 o sin precioHijo)");
    }
    // 3. Bucle para procesar cada plan
    for (let j in preciosAcumulados) {
        let valorLista = preciosAcumulados[j];
        // Seteamos la promoción base
        let promocion = 0.30;
        // Aplicamos descuento por Afinidad/Promo
        let [precioConPromo, montoDesc, pct] = functions.promoDescuento(valorLista, promocion, con_afinidad);
        // Aplicamos la desregulación de aportes (restando descOS)
        let precioFinal = functions.final(aportesOS[0], descOS, precioConPromo);
        console.log(`Plan: ${j} | Lista: ${valorLista} | Descuento: ${montoDesc} (${(pct * 100)}%) | Final: ${precioFinal}`);
        array.push({
            item_id: j,
            name: 'Medifé ' + j.split('_').pop(),
            precio: precioFinal,
            valorLista: valorLista,
            promoDescuento: montoDesc,
            aporteOS: (tipo_de_socio !== 'P') ? descOS : 0
        });
    }
    console.log("--- FIN CÁLCULO MEDIFÉ ---");
    return array;
}
//# sourceMappingURL=medife.js.map