import * as functions from './functions';

export function valor_Medife(
    aportesOS,
    numkids,             // Cantidad total de hijos (0 a 21 años)
    precioTitularMedife, // Ya incluye Adulto 1 + Adulto 2 (si hay)
    precioHijoMedife,    // Precio estándar para el rango 0-21 años
    coeficienteMedife
) {
    console.log("--- INICIO CÁLCULO MEDIFÉ ---");
    console.log('aportesOS :', aportesOS)
    let tipo_de_socio = aportesOS[0];
    let con_afinidad = true;
    console.log('Hijos: ',numkids, ' | Afinidad: ',con_afinidad,' | Tipo Socio: ',tipo_de_socio);
    let array = [];
        console.log('precioTitularMedife :', precioTitularMedife)
    console.log('precioHijoMedife:', precioHijoMedife)
    console.log('coeficienteMedife :', coeficienteMedife)

    // 1. Cálculo de Descuento de Obra Social
    let descOS = functions.calculodescOS(
        aportesOS[0], aportesOS[2], aportesOS[3], 
        coeficienteMedife, aportesOS[4], aportesOS[5], aportesOS[1]
    );
    console.log("Descuento OS (Aportes):", descOS);

    // 2. Sumar Hijos al precio base de Adultos
    let preciosAcumulados = { ...precioTitularMedife };

    if (numkids > 0 && precioHijoMedife) {
        preciosAcumulados = Object.entries(precioHijoMedife).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: (acc[key] || 0) + (parseInt(value) * parseInt(numkids))
        }), preciosAcumulados);
        console.log("Precios con hijos sumados (Lista):", preciosAcumulados);
    } else {
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

        console.log(`Plan: ${j} | Lista: ${valorLista} | Descuento: ${montoDesc} (${(pct*100)}%) | Final: ${precioFinal}`);

        array.push({
            item_id: j,
            name: 'Medifé ' + j.split('_').pop(),
            precio: precioConPromo,
            valorLista: valorLista,
            promoDescuento: montoDesc,
            aporteOS: (tipo_de_socio !== 'P') ? descOS : 0
        });
    }

    console.log("--- FIN CÁLCULO MEDIFÉ ---");
    return array;
}