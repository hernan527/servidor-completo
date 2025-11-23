// src/controllers/compararclinicas.ts

import { Request, Response } from 'express';
// ...
import { groupClinicas as groupClinicasService } from '../services/compararclinicas';
// Importamos la función de consulta con un nombre claro para evitar confusión
import { getSelectedPlansData } from '../services/planes'; 
import { handleHttp } from "../utils/error.handle";
// src/controllers/compararclinicas.ts (Flujo Correcto)

const groupClinics = async (req: Request, res: Response) => {
    try {
        // 1. Obtiene los IDs del Body (SOLO EL CONTROLADOR PUEDE HACER ESTO)
        const { products: productIds } = req.body; 

        if (!productIds || productIds.length === 0) {
            return res.send({}); 
        }

        // 2. Consulta la BD para obtener la data completa (Planes con Clínicas)
        const productsWithClinics = await getSelectedPlansData(productIds); 

        // 3. Pasa la data pura al Servicio (solo el array de objetos)
        const responseItem = await groupClinicasService(productsWithClinics); 
        
        res.send(responseItem);

    } catch (e) {
        handleHttp(res, 'ERROR_GROUP_CLINICA');
    }
};
export { groupClinics };