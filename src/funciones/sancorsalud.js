import * as functions from './functions';

export function valor_SanCor(aportesOS, coeficiente, edad_1, edad_2, numHijos, precio_1Hijo, precio_2Hijo, precio_Titular, precios_Conyuge, numhijo_2, grupo_Fam, boolean_afinidad, promo, genSanCor) {
    let edad2 = edad_2;
    let hijos = numHijos;
    let preciosConyuge = precios_Conyuge;
    let grupoFam = grupo_Fam;
        // console.log('edad2 ',edad2);
        // console.log('hijos ',hijos);
        // console.log('preciosConyuge ',preciosConyuge);
        // console.log('grupoFam ',grupoFam);

    // Lógica de limpieza según grupo
    if (grupoFam == 1) {

        edad2 = 0; preciosConyuge = 0; hijos = 0;
                        // console.log('Lógica de limpieza según grupo edad2',edad2);

    } else if (grupoFam == 2) {
        preciosConyuge = 0; edad2 = 0;
                                // console.log('Lógica de limpieza según grupo preciosConyuge',preciosConyuge);

    } else if (grupoFam == 3) {
        hijos = 0;
                                        // console.log('Lógica de limpieza según grupo hijos',hijos);

    }

    let descOS = functions.calculodescOS(aportesOS[0], aportesOS[2], aportesOS[3], coeficiente, aportesOS[4], aportesOS[5], aportesOS[1]);
    let array = [];
    let precios = {};
    let promocion = 0.50;
    let con_afinidad = true;
        // console.log('descOS ',descOS);

    // 1. Sumar Adultos
    let precio_adultos_Sancor = (edad2 > 17) 
        ? Object.entries(preciosConyuge).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_Titular })
        : precio_Titular;
        // console.log('1. Sumar Adultos precio_adultos_Sancor ',precio_adultos_Sancor);

    // 2. Sumar Hijos
    if (hijos == 1) {
        precios = Object.entries(precio_1Hijo).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_adultos_Sancor });
            // console.log('2. Sumar Hijos precios hijos == 1',precios);

    } else if (hijos > 1) {
        let precio_hijos_acum = Object.entries(precio_2Hijo).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value * numhijo_2) }), { ...precio_1Hijo });
        precios = Object.entries(precio_hijos_acum).reduce((acc, [key, value]) => ({ ...acc, [key]: parseInt(acc[key] || 0) + parseInt(value) }), { ...precio_adultos_Sancor });
               // console.log('2. Sumar Hijos hijos > 1 precios',precios);

    } else {
        precios = precio_adultos_Sancor;
                       // console.log('2. Sumar Hijos else precios',precios);

    }

    // 3. Bucle Final
    for (let j in precios) {
                                       // console.log('3. Bucle Final precios ',precios);
                                       console.log('3. Bucle Final j ',j);

        let otrosBenPrecios = [
    {"col_1": 1, "col_2": 34792, "col_3": 32855, "CS": 22550, "SSPRO": 3114, "SSOD": 7191, "SSAC": 1628, "SUF": 309, "col_9": 22550},
    {"col_1": 2, "col_2": 69607, "col_3": 65701, "CS": 45100, "SSPRO": 6187, "SSOD": 14414, "SSAC": 3288, "SUF": 618, "col_9": 45100},
    {"col_1": 3, "col_2": 97493, "col_3": 91543, "CS": 67650, "SSPRO": 9479, "SSOD": 14414, "SSAC": 5023, "SUF": 927, "col_9": 67650},
    {"col_1": 4, "col_2": 125128, "col_3": 117202, "CS": 90200, "SSPRO": 12588, "SSOD": 14414, "SSAC": 6690, "SUF": 1236, "col_9": 90200},
    {"col_1": 5, "col_2": 153346, "col_3": 142961, "CS": 112750, "SSPRO": 15797, "SSOD": 14414, "SSAC": 8840, "SUF": 1545, "col_9": 112750},
    {"col_1": 6, "col_2": 180504, "col_3": 168577, "CS": 135300, "SSPRO": 18863, "SSOD": 14414, "SSAC": 10073, "SUF": 1854, "col_9": 135300}
    ];
                               console.log('3. Bucle Final otrosBenPrecios ',otrosBenPrecios);

        let plan_gen = j.substring(3, 6);
                               console.log('3. Bucle Final plan_gen ',plan_gen);

        let nombrePlanBase = functions.planNombre(genSanCor, plan_gen, j.substring(3));
                                       console.log('3. Bucle Final nombrePlanBase ',nombrePlanBase);

        let promoInfo = functions.promoDescuento(precios[j], promocion, con_afinidad);
                                             console.log('3. Bucle Final promoInfo ',promoInfo);

        let precioConPromo = promoInfo[0];
                                             console.log('3. Bucle Final precioConPromo ',precioConPromo);

        let cuotaSocial = otrosBenPrecios[grupoFam - 1]['CS'];
        console.log('3. Bucle Final  cuotaSocial ',cuotaSocial);

        let supraSalud = functions.suprasSalud(nombrePlanBase, otrosBenPrecios, grupoFam)
        console.log('3. Bucle Final supraSalud ',supraSalud);


// 2. Aplicamos la lógica: 
// SI es 5000 o 6000 -> Cuota Social + SupraSalud
// SI NO -> Solo Cuota Social
let otrosCargos = (nombrePlanBase.includes('5000') || nombrePlanBase.includes('6000')) 
    ? parseInt(cuotaSocial) + parseInt(supraSalud)
    : parseInt(cuotaSocial);
        console.log('3. Bucle Final otrosCargos',otrosCargos);

        let precioFinalConCargos = precioConPromo + otrosCargos;
        console.log('3. Bucle Final precioFinalConCargos',precioFinalConCargos);

        let precioFinal = functions.final(aportesOS[0], descOS, precioFinalConCargos);
console.log('3. Bucle Final precioFinal',precioFinal);


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