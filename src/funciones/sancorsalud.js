import * as functions from './functions';

export function valor_SanCor(aportesOS, coeficiente, edad_1, edad_2, numHijos, precio_1Hijo, precio_2Hijo, precio_Titular, precios_Conyuge, numhijo_2, grupo_Fam, con_afinidad, promocion, genSanCor) {
    let edad2 = edad_2;
    let hijos = numHijos;
    let preciosConyuge = precios_Conyuge;
    let grupoFam = grupo_Fam;

    // Lógica de limpieza según grupo
    if (grupoFam == 1) {
        edad2 = 0; preciosConyuge = 0; hijos = 0;
    } else if (grupoFam == 2) {
        preciosConyuge = 0; edad2 = 0;
    } else if (grupoFam == 3) {
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
    } else if (hijos > 1) {
        let precio_hijos_acum = Object.entries(precio_2Hijo).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value * numhijo_2) }), { ...precio_1Hijo });
        precios = Object.entries(precio_hijos_acum).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_adultos_Sancor });
    } else {
        precios = precio_adultos_Sancor;
    }

    // 3. Bucle Final
    for (let j in precios) {
        let otrosBenPrecios = [
           otrosBenef = [{"col_1": 1, "col_2": 34792, "col_3": 32855, "CS": 22550, "SSPRO": 3114, "SSOD": 7191, "SSAC": 1628, "SUF": 309, "col_9": 22550},{"col_1": 2, "col_2": 69584, "col_3": 65710, "CS": 45100, "SSPRO": 6228, "SSOD": 14382, "SSAC": 3256, "SUF": 618, "col_9": 45100},{"col_1": 3, "col_2": 104376, "col_3": 98565, "CS": 67650, "SSPRO": 9342, "SSOD": 21573, "SSAC": 4884, "SUF": 927, "col_9": 67650},{"col_1": 4, "col_2": 139168, "col_3": 131420, "CS": 90200, "SSPRO": 12456, "SSOD": 28764, "SSAC": 6512, "SUF": 1236, "col_9": 90200},{"col_1": 5, "col_2": 173960, "col_3": 164275, "CS": 112750, "SSPRO": 15570, "SSOD": 35955, "SSAC": 8140, "SUF": 1545, "col_9": 112750},{"col_1": 6, "col_2": 208752, "col_3": 197130, "CS": 135300, "SSPRO": 18684, "SSOD": 43146, "SSAC": 9768, "SUF": 1854, "col_9": 135300}]
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
            precio: precioFinalConCargos,
            promoPorcentaje: promoInfo[2],
            promoDescuento: promoInfo[1],
            valorLista: precios[j],
            aporteOS: descOS
        });
    }

    return array;
}