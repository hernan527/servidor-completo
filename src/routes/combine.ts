import { Router } from "express";
import * as express from "express";
import { obtenerPlanesConClinicas } from '../services/planes';

const router = Router();

router.use(express.json());

// Se añade req y res, y se usa async/await para manejar la respuesta
router.get('/', async (req, res) => {
    console.log("--- INICIO: Solicitud GET a /planes ---");
    try {
        const resultado = await obtenerPlanesConClinicas();
        console.log(`--- FIN: Se procesaron ${resultado.length} planes. ---`);
        
        // Se envía la respuesta al cliente
        res.status(200).json(resultado); 
    } catch (error) {
        console.error("ERROR en la ruta /planes:", error);
        res.status(500).json({ mensaje: "Error al obtener planes y clínicas." });
    }
});

export { router }