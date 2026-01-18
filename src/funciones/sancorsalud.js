import * as functions from './functions';

export function valor_SanCor(aportesOS, coeficiente, edad_1, edad_2, numHijos, precio_1Hijo, precio_2Hijo, precio_Titular, precios_Conyuge, numhijo_2, grupo_Fam, boolean_afinidad, promo, genSanCor) {
    let edad2 = edad_2;
    let hijos = numHijos;
    let preciosConyuge = precios_Conyuge; 
    let grupoFam = grupo_Fam;
    let sumaConyuge = true;
    console.log('grupoFam',grupoFam)
    
    // 1. Lógica de limpieza según grupo (Aseguramos objetos vacíos, no ceros)
    if (grupoFam == 1) { // Solo Titular
        edad2 = 0; 
        sumaConyuge = false;
        
    } else if (grupoFam == 2) { // Titular e Hijos (NO conyuge)
        edad2 = 0;
        sumaConyuge = false; 
    } else if (grupoFam == 3) { // Matrimonio
        hijos = 0;
    }
     console.log('sumaConyuge',sumaConyuge)

    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    let array = [];
    let promocion = 0.50;
    let con_afinidad = true;
     console.log('preciosConyuge',preciosConyuge)
     console.log('precio_Titular',precio_Titular)

    // 2. Sumar Adultos (Solo si hay cónyuge real)
    let precio_adultos_Sancor = (sumaConyuge) 
        ? Object.entries(preciosConyuge).reduce((acc, [key, value]) => ({ 
            ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) 
          }), { ...precio_Titular })
        : { ...precio_Titular };
     console.log('precio_adultos_Sancor',precio_adultos_Sancor)

    // 3. Sumar Hijos
    let precios = {};
    if (hijos == 1) {
        precios = Object.entries(precio_1Hijo).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_adultos_Sancor });
    } else if (hijos > 1) {
        let precio_hijos_acum = Object.entries(precio_2Hijo).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value * numhijo_2) }), { ...precio_1Hijo });
        precios = Object.entries(precio_hijos_acum).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_adultos_Sancor });
    } else {
        precios = precio_adultos_Sancor;
    }

    // 4. Cálculo de cantidad de personas para Cuota Social
    // Titular (1) + Cónyuge (si edad2 > 17) + Hijos
    let cantIntegrantes = 1 + (edad2 > 17 ? 1 : 0) + hijos;
    const VALOR_CS_UNICO = 22550;

    // 5. Bucle Final
    for (let j in precios) {
                let otrosBenPrecios = [
    {"col_1": 1, "col_2": 34792, "col_3": 32855, "CS": 22550, "SSPRO": 3114, "SSOD": 7191, "SSAC": 1628, "SUF": 309, "col_9": 22550},
    {"col_1": 2, "col_2": 69607, "col_3": 65701, "CS": 45100, "SSPRO": 6187, "SSOD": 14414, "SSAC": 3288, "SUF": 618, "col_9": 45100},
    {"col_1": 3, "col_2": 97493, "col_3": 91543, "CS": 67650, "SSPRO": 9479, "SSOD": 14414, "SSAC": 5023, "SUF": 927, "col_9": 67650},
    {"col_1": 4, "col_2": 125128, "col_3": 117202, "CS": 90200, "SSPRO": 12588, "SSOD": 14414, "SSAC": 6690, "SUF": 1236, "col_9": 90200},
    {"col_1": 5, "col_2": 153346, "col_3": 142961, "CS": 112750, "SSPRO": 15797, "SSOD": 14414, "SSAC": 8840, "SUF": 1545, "col_9": 112750},
    {"col_1": 6, "col_2": 180504, "col_3": 168577, "CS": 135300, "SSPRO": 18863, "SSOD": 14414, "SSAC": 10073, "SUF": 1854, "col_9": 135300}
    ];
        let plan_gen = j.substring(3, 6);
        let nombrePlanBase = functions.planNombre(genSanCor, plan_gen, j.substring(3));
        let promoInfo = functions.promoDescuento(precios[j], promocion, con_afinidad);
        let precioConPromo = promoInfo[0];
        
        // SupraSalud depende del grupoFam de entrada para buscar en la tabla
        let supraSalud = functions.suprasSalud(nombrePlanBase, otrosBenPrecios, grupoFam);

        // Cuota Social Total basada en integrantes reales
        let cuotaSocialTotal = VALOR_CS_UNICO * cantIntegrantes;

        let otrosCargos = (
            nombrePlanBase.includes('5000') || 
            nombrePlanBase.includes('6000') || 
            ((nombrePlanBase.includes('4000') || nombrePlanBase.includes('4500')) && !nombrePlanBase.includes('GEN'))
        ) 
        ? parseInt(cuotaSocialTotal) + parseInt(supraSalud)
        : parseInt(cuotaSocialTotal);

        let precioFinalConCargos = precioConPromo + otrosCargos;

        array.push({
            item_id: j,
            name: (nombrePlanBase.includes('5000') || nombrePlanBase.includes('6000')) ? 'Exclusive ' + nombrePlanBase : 'SanCor ' + nombrePlanBase,
            precio: precioFinalConCargos,
            promoPorcentaje: promoInfo[2],
            promoDescuento: promoInfo[1],
            valorLista: precios[j],
            aporteOS: descOS
        });
    }

    return array;
}


