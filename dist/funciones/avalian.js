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
exports.valor_Avalian = valor_Avalian;
const functions = __importStar(require("./functions"));
function valor_Avalian(aporteOS, // Array [tipo_Ingreso, beneficiarios, sueldo, etc.]
coeficiente, grupo, bonAfinidad, Titular, Conyuge, Hijo1, Hijo2, Hijo3, numKids) {
    // console.log("--- INICIO CÁLCULO AVALIAN ---");
    let array = [];
    let tipo_IngresoPDMI = aporteOS[0].trim();
    // 1. Definir porcentajes base según tipo de ingreso
    let bonificacion_promocion = 0;
    let cuota_Social_Pct = 0;
    if (tipo_IngresoPDMI === 'P') {
        bonificacion_promocion = 0.35;
        cuota_Social_Pct = 0.0765;
    }
    else if (tipo_IngresoPDMI === 'D') {
        bonificacion_promocion = 0.40;
        cuota_Social_Pct = 0.0780;
    }
    let bonificacion_forma_de_pago = 0.10;
    let descuento_total_porcentaje = bonificacion_promocion + bonificacion_forma_de_pago;
    // console.log(`Tipo Ingreso: ${tipo_IngresoPDMI} | Desc. Promoción: ${bonificacion_promocion} | Desc. Pago: ${bonificacion_forma_de_pago}`);
    // 2. Cálculo de Descuento Obra Social
    let descOS = functions.calculodescOS(aporteOS[0], aporteOS[2], aporteOS[3], coeficiente, aporteOS[4], aporteOS[5], aporteOS[1]);
    // console.log("Descuento OS calculado:", descOS);
    // 3. Sumar el Grupo Familiar (Precios Brutos)
    let preciosBrutos = { ...Titular };
    if (Conyuge && (grupo === 2 || grupo === 3)) {
        preciosBrutos = sumObjects(preciosBrutos, Conyuge);
    }
    if (numKids > 0) {
        if (numKids >= 1)
            preciosBrutos = sumObjects(preciosBrutos, Hijo1);
        if (numKids >= 2)
            preciosBrutos = sumObjects(preciosBrutos, Hijo2);
        if (numKids >= 3) {
            let cantidadHijosH3 = numKids - 2;
            preciosBrutos = sumObjects(preciosBrutos, Hijo3, cantidadHijosH3);
        }
    }
    // console.log("Precios Brutos Totales por plan:", preciosBrutos);
    // 4. Bucle de Cálculo Final
    for (let planId in preciosBrutos) {
        let valorBruto = preciosBrutos[planId];
        // A. Aplicar Descuento Sumado
        let precioConBonificaciones = valorBruto * (1 - descuento_total_porcentaje);
        // B. Sumar Cuota Social (sobre el Bruto original)
        let montoCuotaSocial = valorBruto * cuota_Social_Pct;
        // C. Precio subtotal antes de restar aportes
        let precioAntesDeOS = precioConBonificaciones + montoCuotaSocial;
        // D. Restar Aportes Obra Social
        let precioFinal = functions.final(tipo_IngresoPDMI, descOS, precioAntesDeOS);
        // console.log(`Plan: ${planId} | Bruto: ${valorBruto} | Subtotal: ${precioAntesDeOS.toFixed(2)} | Final: ${precioFinal.toFixed(2)}`);
        array.push({
            item_id: planId,
            name: 'Avalian ' + planId.split('_').pop(),
            precio: precioAntesDeOS,
            valorLista: valorBruto,
            aporteOS: tipo_IngresoPDMI !== 'P' ? descOS : 0
        });
    }
    // console.log("--- FIN CÁLCULO AVALIAN ---");
    return array;
}
function sumObjects(base, adder, multiplier = 1) {
    return Object.entries(adder).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: (acc[key] || 0) + (parseInt(value) * multiplier)
    }), base);
}
//# sourceMappingURL=avalian.js.map