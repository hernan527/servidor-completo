import { Router } from "express";
import * as express from "express";
import { groupClinics } from '../controllers/compararclinicas'; 

const router = Router();

router.use(express.json());

// Middleware o función de ruta para registrar cada llamada
router.post('/', (req, res) => { 
    // Console.log para indicar que el endpoint ha sido llamado
    console.log(`[POST /compararclinicas] Endpoint llamado a las: ${new Date().toISOString()}`);
    console.log(`Cuerpo de la solicitud (body):`, req.body);
    
    // Llamada a la función controladora original
    groupClinics(req, res); 
}); 

export { router };