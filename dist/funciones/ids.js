"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grupoFamiliar = grupoFamiliar;
exports.tipoAsociado = tipoAsociado;
exports.productID = productID;
exports.productIdGaleno = productIdGaleno;
exports.productIdPremedic = productIdPremedic;
exports.productIdOmint = productIdOmint;
exports.productIdSwiss = productIdSwiss;
exports.productIdMedife = productIdMedife;
exports.productIdPrevencion = productIdPrevencion;
exports.productIdDoctored = productIdDoctored;
exports.productIdRasCristal = productIdRasCristal;
exports.productIBayres = productIBayres;
exports.productIdAsmepriv = productIdAsmepriv;
exports.productIdLuisPasteur = productIdLuisPasteur;
exports.productIdAvalian = productIdAvalian;
exports.productIdHominis = productIdHominis;
function grupoFamiliar(age0, age1, kids, group) {
    let edad0 = age0;
    let edad1 = age1;
    let num_adultos = 1;
    let numhijo1 = 0;
    let numhijo2 = 0;
    let gen = '';
    let grupoFam = 0;
    let numhijos = kids;
    let numhijo = 0;
    if (group === 1) {
        edad1 = 0;
        numhijos = 0;
    }
    else if (group === 2) {
        edad1 = 0;
    }
    else if (group === 3) {
        numhijos = 0;
    }
    else { }
    if (kids === null) {
        numhijos = 0;
    }
    if (age1 === null) {
        edad1 = 0;
    }
    if (edad1 == 0 && numhijos == 0) {
        num_adultos = 1;
        numhijo1 = 0;
        numhijo2 = 0;
        numhijos = 0;
    }
    else if (edad1 > 0 && numhijos == 0) {
        num_adultos = 2;
        numhijo1 = 0;
        numhijo2 = 0;
        numhijos = 0;
    }
    else if (edad1 == 0 && numhijos >= 1) {
        num_adultos = 1;
        numhijo1 = 1;
        numhijo2 = numhijos - 1;
        numhijos = numhijos;
    }
    else if (edad1 > 0 && numhijos >= 1) {
        num_adultos = 2;
        numhijo1 = 1;
        numhijo2 = numhijos - 1;
        numhijos = numhijos;
    }
    grupoFam = parseInt(num_adultos) + parseInt(numhijos);
    numhijo = parseInt(numhijos);
    if (edad0 <= 35 && edad1 <= 35) {
        gen = 'GEN';
    }
    else {
        gen = '';
    }
    // console.log(grupoFam)
    return [num_adultos, numhijo1, numhijo2, numhijo, gen, grupoFam];
}
function tipoAsociado(_tipo) {
    let tipoAsoc = '';
    let tipo = _tipo;
    if (tipo === "M" || tipo === "D") {
        tipoAsoc = "D";
    }
    else if (tipo === "I" || tipo === "P") {
        tipoAsoc = "P";
    }
    ;
    return tipoAsoc;
}
// <!----------------------Funcion PRODUCT ID SANCOR start---------------------------->     
function productID(_edad, tipoAsoc, gen, miembro, numHijos, group) {
    let edadId = '';
    let grupoSigla = '';
    let tipo = tipoAsoc;
    let edadID1 = '';
    let edadID2 = '';
    let hijoId = '';
    let hijo2Id = '';
    let edad = _edad;
    // if (gen == 'GEN' && numHijos > 0) {
    // 	grupoSigla = 'GF'
    // };
    if (18 <= edad && edad <= 25) {
        edadId = 'sancor1' + tipo;
        hijoId = 'sancor1H' + tipo;
        hijo2Id = 'sancor2H' + tipo;
    }
    else if (26 <= edad && edad <= 29) {
        edadId = 'sancor2' + tipo;
        hijoId = 'sancor1H' + tipo;
        hijo2Id = 'sancor2H' + tipo;
    }
    else if (30 <= edad && edad <= 35) {
        edadId = 'sancor3' + tipo;
        hijoId = 'sancor1H' + tipo;
        hijo2Id = 'sancor2H' + tipo;
    }
    else if (36 <= edad && edad <= 39) {
        edadId = 'sancor4' + tipo;
        hijoId = 'sancor1HH' + tipo;
        hijo2Id = 'sancor2HH' + tipo;
    }
    else if (40 <= edad && edad <= 45) {
        edadId = 'sancor5' + tipo;
        hijoId = 'sancor1HH' + tipo;
        hijo2Id = 'sancor2HH' + tipo;
    }
    else if (46 <= edad && edad <= 49) {
        edadId = 'sancor6' + tipo;
        hijoId = 'sancor1HH' + tipo;
        hijo2Id = 'sancor2HH' + tipo;
    }
    else if (50 <= edad && edad <= 59) {
        edadId = 'sancor7' + tipo;
        hijoId = 'sancor1HH' + tipo;
        hijo2Id = 'sancor2HH' + tipo;
    }
    else if (60 <= edad && edad <= 69) {
        edadId = 'sancor8' + tipo;
        hijoId = 'sancor1HH' + tipo;
        hijo2Id = 'sancor2HH' + tipo;
    }
    else if (70 <= edad) {
        edadId = 'sancor9' + tipo;
        hijoId = 'sancor1HH' + tipo;
        hijo2Id = 'sancor2HH' + tipo;
    }
    if (miembro === 'titular') {
        edadID1 = edadId + grupoSigla;
    }
    else {
        edadID2 = edadId + grupoSigla;
    }
    ;
    return [edadID1, edadID2, hijoId, hijo2Id];
}
;
// <!----------------------Funcion PRODUCT ID SANCOR end---------------------------->   
// <!----------------------Funcion PRODUCT ID GALENO start---------------------------->        
function productIdGaleno(anios_1, anios_2, tipoAsoc, num_Hijos, group) {
    let numHijos = num_Hijos;
    let tipoGaleno = tipoAsoc + 'S';
    let grupoSiglaGaleno = 'IND';
    let edadIdGaleno = '';
    let anios2 = anios_2;
    let anios = anios_1;
    if (group === 1) {
        anios2 = 0;
        numHijos = 0;
    }
    else if (group === 2) {
        anios2 = 0;
    }
    else if (group === 3) {
        numHijos = 0;
    }
    else { }
    if (anios2 > anios) {
        anios2 = anios_1;
        anios = anios_2;
    }
    ;
    if (anios2 >= 18) {
        grupoSiglaGaleno = 'MAT';
        anios2 = anios2;
        anios = anios;
    }
    if (anios <= 25) {
        edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 25 + 'y' + numHijos + 'h';
    }
    else if (anios <= 36) {
        edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 36 + 'y' + numHijos + 'h';
    }
    else if (anios <= 64) {
        edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 64 + 'y' + numHijos + 'h';
    }
    else if (anios <= 65) {
        edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 65 + 'y' + numHijos + 'h';
    }
    ;
    return edadIdGaleno;
}
;
// // <!----------------------Funcion PRODUCT ID GALENO end---------------------------->
// // <!----------------------Funcion PRODUCT ID PREMEDIC start----------------------------> 
function productIdPremedic(edad_1, edad_2, tipoAsoc, num_Hijos, group) {
    let edadIdPremedic = '';
    let age2 = edad_2;
    let age = edad_1;
    let numHijos = num_Hijos;
    if (group === 1) {
        age2 = 0;
        numHijos = 0;
    }
    else if (group === 2) {
        age2 = 0;
    }
    else if (group === 3) {
        numHijos = 0;
    }
    else { }
    if (edad_2 === null) {
        age2 = 0;
    }
    if (age2 > age) {
        age2 = age;
        age = edad_2;
    }
    ;
    if (age2 >= 18) {
        if (age <= 29) {
            edadIdPremedic = tipoAsoc + 'MAT' + 29 + 'y' + numHijos + 'h';
        }
        else if (age <= 39 && age >= 30) {
            edadIdPremedic = tipoAsoc + 'MAT' + 39 + 'y' + numHijos + 'h';
        }
        else if (age <= 49 && age >= 40) {
            edadIdPremedic = tipoAsoc + 'MAT' + 49 + 'y' + numHijos + 'h';
        }
        else if (age <= 59 && age >= 50) {
            edadIdPremedic = tipoAsoc + 'MAT' + 59 + 'y' + numHijos + 'h';
        }
    }
    else if (age2 == 0) {
        if (age <= 29) {
            edadIdPremedic = tipoAsoc + 'IND' + 29 + 'y0h';
        }
        else if (age <= 39 && age >= 30) {
            edadIdPremedic = tipoAsoc + 'IND' + 39 + 'y0h';
        }
        else if (age <= 49 && age >= 40) {
            edadIdPremedic = tipoAsoc + 'IND' + 49 + 'y0h';
        }
        else if (age <= 59 && age >= 50) {
            edadIdPremedic = tipoAsoc + 'IND' + 59 + 'y0h';
        }
        else {
            edadIdPremedic = '';
        }
    }
    return edadIdPremedic;
}
// <!----------------------Funcion PRODUCT ID PREMEDIC END---------------------------->    
// <!----------------------Funcion PRODUCT ID OMINT start---------------------------->        
function productIdOmint(anios, tipoAsoc, miembro, group) {
    // console.log("variable anios : " + anios + "- variable tipoAsoc : " + tipoAsoc + " - variable miembro : " + miembro) 
    let edadID = '';
    let tipo = tipoAsoc;
    let edad = anios;
    let edadID1OMINT = '';
    let edadID2OMINT = '';
    let hijoIdOMINT = 'omint' + tipo + 'H1';
    let hijo2IdOMINT = 'omint' + tipo + 'H2';
    if (group === 1 && miembro !== 'titular') {
        edad = 0;
    }
    else if (group === 2) {
        edad = 0;
    }
    else { }
    if (edad >= 18 && edad <= 25) {
        edadID = tipo + 25;
    }
    else if (edad >= 26 && edad <= 35) {
        edadID = tipo + 35;
    }
    else if (edad >= 36 && edad <= 54) {
        edadID = tipo + 54;
    }
    else if (edad >= 55 && edad <= 59) {
        edadID = tipo + 59;
    }
    else {
        edadID = tipo + 60;
    }
    if (miembro === 'titular') {
        edadID1OMINT = 'omint' + edadID;
    }
    else {
        edadID2OMINT = 'omint' + edadID;
    }
    ;
    // // console.log("edadID1OMINT=" + edadID1OMINT + "; edadID2OMINT =" + edadID2OMINT + "; hijoIdOMINT ="+ hijoIdOMINT + "; hijo2IdOMINT =" + hijo2IdOMINT)
    return [edadID1OMINT, edadID2OMINT, hijoIdOMINT, hijo2IdOMINT];
}
;
// <!----------------------Funcion PRODUCT ID OMINT end---------------------------->
// <!----------------------Funcion PRODUCT ID SWISS start---------------------------->        
function productIdSwiss(anios, tipoAsoc, group) {
    let edadID = '';
    let tipo = tipoAsoc;
    let edad = anios;
    if (group === 1) {
        edad = 0;
    }
    else if (group === 2) {
        edad = 0;
    }
    else { }
    if (edad >= 18 && edad <= 25) {
        edadID = tipo + 25;
    }
    else if (edad >= 26 && edad <= 35) {
        edadID = tipo + 35;
    }
    else if (edad >= 36 && edad <= 40) {
        edadID = tipo + 40;
    }
    else if (edad >= 41 && edad <= 45) {
        edadID = tipo + 45;
    }
    else if (edad >= 46 && edad <= 50) {
        edadID = tipo + 50;
    }
    else if (edad >= 51 && edad <= 55) {
        edadID = tipo + 55;
    }
    else if (edad >= 56 && edad <= 60) {
        edadID = tipo + 60;
    }
    else if (edad >= 61 && edad <= 63) {
        edadID = tipo + 63;
    }
    else {
        edadID = tipo + 60;
    }
    return edadID;
}
// <!----------------------Funcion PRODUCT ID END start----------------------------> 
// <!----------------------Funcion PRODUCT ID MEDIFE start----------------------------> 
function productIdMedife(edad_1, edad_2, tipoAsoc, group) {
    let edadIdMedife = '';
    // Aseguramos valores numéricos
    let age = Number(edad_1);
    let age2 = (group === 1 || group === 2 || edad_2 === null) ? 0 : Number(edad_2);
    // console.log('🚀 Procesando Medifé:', { edad_1: age, edad_2: age2, tipoAsoc, group });
    // Lógica para que 'age' siempre sea el mayor de los dos (titular/conyuge)
    if (age2 > age) {
        [age, age2] = [age2, age]; // Swap elegante
    }
    // Determinamos si es Matrimonio o Individual
    const modal = (age2 >= 18) ? 'MAT' : 'IND';
    const prefijo = 'medife' + tipoAsoc + modal;
    // Evaluación de rangos
    if (age <= 25) {
        edadIdMedife = prefijo + '0-25';
    }
    else if (age <= 35) {
        edadIdMedife = prefijo + '26-35';
    }
    else if (age <= 40) {
        edadIdMedife = prefijo + '36-40';
    }
    else {
        // Rangos específicos según modalidad
        if (modal === 'MAT') {
            if (age <= 50)
                edadIdMedife = prefijo + '41-50';
            else if (age <= 60)
                edadIdMedife = prefijo + '51-60';
            else if (age <= 65)
                edadIdMedife = prefijo + '61-65';
        }
        else {
            // Modalidad Individual
            if (age <= 45)
                edadIdMedife = prefijo + '41-45';
            else if (age <= 50)
                edadIdMedife = prefijo + '46-50';
            else if (age <= 60)
                edadIdMedife = prefijo + '51-60';
            else if (age <= 65)
                edadIdMedife = prefijo + '61-65';
        }
    }
    // console.log('🆔 ID Generado:', edadIdMedife);
    return edadIdMedife;
}
// <!----------------------Funcion PRODUCT ID MEDIFE end----------------------------> 
// <!----------------------Funcion PRODUCT ID PREVENCION SALUD start----------------------------> 
function productIdPrevencion(edad_1, edad_2, hijos, tipoAsoc) {
    let edadIdPrevencion = '';
    let age2 = edad_2;
    let age = edad_1;
    let kids = 'y' + hijos + 'H';
    let tipo = tipoAsoc;
    let grupoSiglaPrevencion = '';
    let zona = 'Z4';
    if (edad_2 === null) {
        age2 = 0;
    }
    if (hijos === null || hijos === 0) {
        kids = '';
    }
    if (age2 > age) {
        age2 = age;
        age = edad_2;
    }
    ;
    if (age2 >= 18) {
        grupoSiglaPrevencion = 'MAT';
    }
    else {
        grupoSiglaPrevencion = 'IND';
    }
    if (age <= 25) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '0-25';
    }
    else if (age <= 30 && age >= 26) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '26-30';
    }
    else if (age <= 35 && age >= 31) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '31-35';
    }
    else if (age <= 40 && age >= 36) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '36-40';
    }
    else if (age <= 45 && age >= 41) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '41-45';
    }
    else if (age <= 50 && age >= 46) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '46-50';
    }
    else if (age <= 55 && age >= 51) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '51-55';
    }
    else if (age <= 60 && age >= 56) {
        edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '56-60';
    }
    return edadIdPrevencion;
}
// <!----------------------Funcion PRODUCT ID PREVENCION SALUD end----------------------------> 
// // <!----------------------Funcion PRODUCT ID DOCTORED start----------------------------> 
function productIdDoctored(edad_1, edad_2, tipoAsoc, num_Hijos, group) {
    let age2 = edad_2;
    let age = edad_1;
    let hijos1y2 = num_Hijos;
    let indOMat = "IND";
    let rangoEtario = '18-25';
    let tipo = tipoAsoc;
    let idDoctored = 'doctored' + indOMat + tipoAsoc + rangoEtario + 'y' + hijos1y2 + 'h';
    let idDoctoredHijo3 = 'doctored' + tipo + 'HIJO';
    let idDoctoredAd = 'doctoredAD' + tipo + rangoEtario;
    if (hijos1y2 > 2) {
        hijos1y2 = 2;
    }
    else { }
    if (tipo == 'I') {
        tipo = 'P';
    }
    else if (tipo == 'M') {
        tipo = 'D';
    }
    else { }
    if (group === 1) {
        age2 = 0;
        hijos1y2 = 0;
    }
    else if (group === 2) {
        age2 = 0;
    }
    else if (group === 3) {
        hijos1y2 = 0;
    }
    else { }
    if (edad_2 === null) {
        age2 = 0;
    }
    if (age2 > age) {
        age2 = age;
        age = edad_2;
        indOMat = 'MAT';
    }
    ;
    if (age <= 25) {
        rangoEtario = '18-25y';
    }
    else if (age <= 35 && age >= 26) {
        rangoEtario = '25-35y';
    }
    else if (age <= 45 && age >= 36) {
        rangoEtario = '35-45y';
    }
    else if (age <= 55 && age >= 46) {
        rangoEtario = '46-55y';
    }
    else if (age <= 60 && age >= 56) {
        rangoEtario = '56-60y';
    }
    else if (age <= 69 && age >= 61) {
        rangoEtario = '61-69y';
    }
    else if (age <= 79 && age >= 70) {
        rangoEtario = '70-79y';
    }
    return [idDoctored, idDoctoredHijo3, idDoctoredAd];
}
// <!----------------------Funcion PRODUCT ID DOCTORED END----------------------------> 
// <!----------------------Funcion PRODUCT ID RAS y CRISTAL start---------------------------->        
function productIdRasCristal(anios1, anios2, tipoAsoc, group) {
    let ids = [];
    const ageRanges = [
        { min: 8, max: 17, label: '08-17' },
        { min: 18, max: 25, label: '18-25' },
        { min: 26, max: 35, label: '26-35' },
        { min: 36, max: 45, label: '36-45' },
        { min: 46, max: 55, label: '46-55' },
        { min: 56, max: 60, label: '56-60' },
        { min: 61, max: 65, label: '61-65' },
        { min: 66, max: 70, label: '66-70' },
        { min: 71, max: 75, label: '71-75' },
        { min: 76, max: 80, label: '76-80' },
        { min: 81, max: 85, label: '81-85' },
        { min: 86, max: Infinity, label: 'masde85' }
    ];
    // Function to map age to range
    function getAgeRange(age) {
        for (const range of ageRanges) {
            if (age >= range.min && age <= range.max) {
                return range.label;
            }
        }
        return ''; // If no range matches
    }
    // Adjust the 'tipo' (type) based on the input
    let tipo = tipoAsoc;
    if (tipo === "M")
        tipo = "D";
    else if (tipo === "I")
        tipo = "P";
    // Determine the age ranges
    const rangoEtario_1 = getAgeRange(anios1);
    let rangoEtario_2 = '';
    if (group === 3 || group === 4) {
        rangoEtario_2 = getAgeRange(anios2);
    }
    // Create IDs for titular, conyuge, and hijos
    const idTitularRas = "ras" + tipo + rangoEtario_1;
    const idConyugeRas = "ras" + tipo + rangoEtario_2;
    const idHijo1Ras = "ras" + tipo + "1H";
    const idHijo2Ras = "ras" + tipo + "2H";
    const idHijo3Ras = "ras" + tipo + "3H";
    const idTitularCristal = "cristal" + tipo + rangoEtario_1;
    const idConyugeCristal = "cristal" + tipo + rangoEtario_2;
    const idHijo1Cristal = "cristal" + tipo + "1H";
    const idHijo2Cristal = "cristal" + tipo + "2H";
    const idHijo3Cristal = "cristal" + tipo + "3H";
    // Store the IDs in an array
    ids.push(idTitularRas, idConyugeRas, idHijo3Ras, idHijo2Ras, idHijo1Ras, idTitularCristal, idConyugeCristal, idHijo3Cristal, idHijo2Cristal, idHijo1Cristal);
    return ids;
}
// <!----------------------Funcion PRODUCT ID RAS y CRISTAL end---------------------------->    
// <!----------------------Funcion PRODUCT ID BAYRES PLAN start---------------------------->        
function productIBayres(edad_1, edad_2, group) {
    let age_1 = edad_1;
    let age_2 = edad_2;
    let kids = "";
    let grupo = group;
    let rangoEtario = "";
    let ids = [];
    let idAdultos = "";
    if (grupo === 1 || grupo === 2) {
        age_2 = 0;
        grupo = 'IND';
        if (grupo === 'IND') {
            kids = "";
        }
        else if (grupo === 'IND') {
            kids = "y1Hhasta25";
        }
    }
    else if (grupo === 3 || grupo === 4) {
        grupo = 'MAT';
        if (age_2 > age_1) {
            age_1 = age_2;
            age_2 = edad_1;
        }
        else if (grupo === 'MAT') {
            kids = "";
        }
        else if (grupo === 'MAT') {
            kids = "y1H";
        }
    }
    const getAgeRange = (age) => {
        if (age <= 49)
            return '0-49';
        if (age <= 59)
            return '50-59';
        if (age <= 64)
            return '60-64';
        if (age <= 69)
            return '65-69';
        if (age <= 74)
            return '70-74';
        if (age <= 79)
            return '75-79';
        if (age <= 89)
            return '80-89';
        return "masde90";
    };
    // Determine ranges for both individuals
    rangoEtario = getAgeRange(age_1);
    if (rangoEtario === 0 - 49 || rangoEtario === 50 - 59) {
        idAdultos = "bayres" + grupo + kids + rangoEtario;
    }
    else {
        idAdultos = "bayres" + grupo + "-" + rangoEtario;
    }
    let idHijohasta25 = "bayres" + "ADHhasta25-" + rangoEtario;
    let idAdicional18a49 = "bayres" + "AD18A49-" + rangoEtario;
    let idSinMaternidad = "bayresIND-JOV-hastas25-SMAT-0-49";
    let idIND18a29 = "bayresIND-18-29";
    ids.push(idAdultos, idHijohasta25, idAdicional18a49, idSinMaternidad, idIND18a29);
    return ids;
}
// <!----------------------Funcion PRODUCT ID BAYRES PLAN end----------------------------> 
// <!----------------------Funcion PRODUCT ID ASMEPRIV start---------------------------->        
function productIdAsmepriv(edad_1, edad_2, hijos, tipoAsoc, group) {
    let age_1 = edad_1;
    let age_2 = edad_2;
    let tipo = tipoAsoc;
    let kids = "y" + hijos + "H";
    let grupo = group;
    let rangoEtario = "";
    let ids = [];
    if (edad_2 === null) {
        age_2 = 0;
    }
    if (grupo === 1 || grupo === 2) {
        age_2 = 0;
        grupo = 'IND';
        if (grupo === 'IND') {
            kids = "y0H";
        }
    }
    else if (grupo === 3 || grupo === 4) {
        grupo = 'MAT';
        if (age_2 > age_1) {
            age_1 = age_2;
            age_2 = edad_1;
        }
        else if (grupo === 'MAT') {
            kids = "y0H";
        }
    }
    const getAgeRange = (age) => {
        if (age < 18)
            return;
        if (age <= 29)
            return '18-29';
        if (age <= 39)
            return '30-39';
        if (age <= 49)
            return '40-49';
        if (age <= 59)
            return '50-59';
        if (age <= 64)
            return '60-64';
        if (age <= 64)
            return '65-69';
        if (age <= 54)
            return '70-71';
        return;
    };
    rangoEtario = getAgeRange(age_1);
    if (tipo != "P" && rangoEtario === '60-64' || tipo != "P" && rangoEtario === '65-69' || tipo != "P" && rangoEtario === '70-71') {
        rangoEtario = "";
    }
    else if (rangoEtario === '60-64' || rangoEtario === '65-69' || rangoEtario === '70-71') {
        kids = "";
    }
    let idAsmepriv = "asmepriv" + tipo + grupo + kids + rangoEtario;
    let idAdmenorUno = "asmepriv" + tipo + "ADH-1"; // adicional menor d eun año
    let idHijoHasta21 = "asmepriv" + tipo + "H-21"; // hijo hasta 21 años
    let idRecargoHijo21a29 = "asmepriv" + tipo + "RECH21A29"; // recargo hijo de 21 a 29 años
    let idModuloMat = "asmepriv" + tipo + "MODMAT"; // modulo maternidad
    ids.push(idAsmepriv, idAdmenorUno, idHijoHasta21, idRecargoHijo21a29, idModuloMat);
    // console.log("idAsmepriv :" + idAsmepriv);
    // console.log("idAdmenorUno :" + idAdmenorUno);
    // console.log("idHijoHasta21 :" + idHijoHasta21);
    // console.log("idRecargoHijo21a29 :" + idRecargoHijo21a29);
    // console.log("idModuloMat :" + idModuloMat);
    return ids;
}
// <!----------------------Funcion PRODUCT ID ASMEPRIV end---------------------------->
// <!----------------------Funcion PRODUCT ID LUIS PASTEUR start---------------------------->
function productIdLuisPasteur(edad_1, edad_2, hijos, tipoAsoc, group) {
    let grupo = group;
    let age2 = edad_2;
    let age = edad_1;
    let kids = 'y' + hijos;
    let tipo = tipoAsoc;
    let ids = [];
    if (grupo === 1 || grupo === 2) {
        age2 = 0;
        grupo = 'IND';
        if (grupo === 'IND') {
            kids = "";
        }
    }
    else if (grupo === 3 || grupo === 4) {
        grupo = 'MAT';
        if (age2 > age) {
            age = age2;
            age2 = edad_1;
        }
        else if (grupo === 'MAT') {
            kids = "";
        }
    }
    if (hijos === null || hijos === 0) {
        kids = '';
    }
    // console.log('grupo : ' + grupo);
    const getAgeRange = (age) => {
        if (age < 18)
            return;
        if (age <= 25)
            return '18-25';
        if (age <= 30)
            return '26-30';
        if (age <= 35)
            return '31-35';
        if (age <= 45)
            return '36-45';
        if (age <= 49)
            return '46-49';
        if (age <= 54)
            return '50-54';
        if (age <= 59)
            return '55-59';
        return '60';
    };
    let rangoEtario = getAgeRange(age);
    // console.log('grupo : ' + grupo);
    // console.log('tipo : ' + tipo);
    // console.log('rangoEtario : ' + rangoEtario);
    // console.log('hijos : ' + kids);
    let idLuispasteur = "luispasteur" + grupo + tipo + rangoEtario + kids;
    // console.log('idLuispasteur : ' + idLuispasteur);
    let idNieto = "luispasteur" + "NIETO" + tipo;
    let idAd = "luispasteur" + "AD" + tipo;
    let idHijo = "luispasteur" + "HIJO" + tipo;
    // console.log('idNieto : ' + idNieto);
    // console.log('idAd : ' + idAd);
    // console.log('idHijo : ' + idHijo);
    ids.push(idLuispasteur, idNieto, idAd, idHijo);
    return ids;
}
// <!----------------------Funcion PRODUCT ID LUIS PASTEUR end----------------------------> 
// <!----------------------Funcion PRODUCT ID AVALIAN  start----------------------------> 
function productIdAvalian(anios1, anios2, tipoAsoc, group) {
    let age_1 = anios1;
    let age_2 = anios2;
    let grupo = group;
    let rangoEtario_1 = "";
    let rangoEtario_2 = "";
    let zonaComercial = ["BA", "E", "P"];
    let tipo = tipoAsoc;
    let idTitular = "";
    let idConyuge = "";
    let idHijo1 = "";
    let idHijo2 = "";
    let idHijo3 = "";
    let idHijo25 = "";
    let ids = [];
    // Correct comparison operators (== or ===) instead of assignment (=)
    if (tipo === "M") {
        tipo = "D";
    }
    else if (tipo === "I") {
        tipo = "P";
    }
    // console.log("ID AVALIAN EN CURSO - tipo: " + tipo);
    // Function to determine amasdege range
    const getAgeRange = (age) => {
        if (age <= 25)
            return '25';
        if (age <= 30)
            return '26-30';
        if (age <= 35)
            return '31-35';
        if (age <= 40)
            return '36-40';
        if (age <= 45)
            return '41-45';
        if (age <= 49)
            return '46-49';
        if (age <= 55)
            return '50-55';
        if (age <= 60)
            return '56-60';
        if (age <= 64)
            return '61-64';
        return 'masde65';
    };
    // Determine ranges for both individuals
    rangoEtario_1 = getAgeRange(age_1);
    // For the group 3 or 4, we calculate age for both people
    if (grupo === 3 || grupo === 4) {
        rangoEtario_2 = getAgeRange(age_2);
    }
    else {
        rangoEtario_2 = rangoEtario_1; // Same range as the first person
    }
    // console.log("rangoEtario_1: " + rangoEtario_1);
    // console.log("rangoEtario_2: " + rangoEtario_2);
    // Generate IDs for each role
    idTitular = "avalian" + "Z" + zonaComercial[0] + tipo + rangoEtario_1;
    idConyuge = "avalian" + "Z" + zonaComercial[0] + tipo + rangoEtario_2;
    idHijo3 = "avalian" + "Z" + zonaComercial[0] + tipo + "3H";
    idHijo2 = "avalian" + "Z" + zonaComercial[0] + tipo + "2H";
    idHijo1 = "avalian" + "Z" + zonaComercial[0] + tipo + "1H";
    idHijo25 = "avalian" + "Z" + zonaComercial[0] + tipo + "25";
    ids.push(idTitular, idConyuge, idHijo3, idHijo2, idHijo1, idHijo25);
    // Return array of ids
    return ids;
}
// <!----------------------Funcion PRODUCT ID AVALIAN end----------------------------> 
// <!----------------------Funcion PRODUCT ID HOMINIS  start----------------------------> 
function productIdHominis(edad_1, edad_2, tipoAsoc, numHijos, group) {
    let age_1 = edad_1;
    let age_2 = edad_2;
    let grupo = group;
    let kids = "y" + numHijos + "H";
    let rangoEtario = "";
    let tipo = tipoAsoc;
    // // Correct comparison operators (== or ===) instead of assignment (=)
    // if (tipo === "M") {
    //     tipo = "D";
    // } else if (tipo === "I") {
    //     tipo = "P";
    // }
    // // Function to determine age range
    // const getAgeRange = (age) => {
    // 	if (age <= 17) return '';
    //     if (age <= 39) return '18-39';
    //     if (age <= 49) return '40-49';
    //     if (age <= 64) return '50-64';
    //     return '65';
    // };
    // if (grupo === 1 || grupo === 2  ) {
    //     age_2 = 0;
    // 	grupo = 'IND';
    //        if(grupo === 'IND'){
    // 		kids = "";
    // 	   } else if (grupo === 'IND' && age_1 <= 25 ){
    // 		rangoEtario = "18-25";
    // 	   } else {rangoEtario = getAgeRange(age_1);} 
    // } else if (grupo === 3 || grupo === 4) {
    // 	grupo = 'MAT';
    // 	if ( age_2 > age_1 ) {
    // 		 age_1 = age_2;
    // 		age_2 = edad_1;
    // 	} else if   (grupo === 'MAT'){
    // 		kids = "";
    // 	   }else if (grupo === 'MAT' && age_1 >= 26 ){
    // 		rangoEtario = "18-25";
    // 	   } else {rangoEtario = getAgeRange(age_1);}  	
    // 	}
    let idHominis = "hominis";
    // let idHominis = "hominis" + grupo + kids + tipo + rangoEtario;
    // 	console.log(idHominis)
    return idHominis;
}
// <!----------------------Funcion PRODUCT ID HOMINIS end----------------------------> 
//# sourceMappingURL=ids.js.map