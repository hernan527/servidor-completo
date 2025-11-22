
import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { getItems as getSheetsItems } from "../services/googlesheets"; // Renombrar para evitar conflicto

const getItems = async (req: Request, res: Response) => {
    // console.log('controller')
    try {
        // La llamada al servicio es ahora limpia
        const response = await getSheetsItems(); 
        
        // El servicio ya procesó y limpió los datos, solo los devolvemos.
        // Usamos status 200 OK
        res.status(200).json({ data: response }); 
        
    } catch (e) {
        // La función handleHttp maneja el error y envía la respuesta HTTP
        handleHttp(res, 'ERROR_GET_SHEETS_DATA', e); 
    }
};

export { getItems }