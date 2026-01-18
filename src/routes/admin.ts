import { Router } from 'express';
import { procesarCotiSimple } from '../services/generarCotizaciones';

const router = Router();

/**
 * Endpoint para disparar la carga masiva
 * URL: .../generar-maestro?key=therollingstones&fecha_corte=2026-01-14T23:59:59
 * curl http://localhost:3/generar-maestro?key=therollingstones&
 */
router.post('/generar-maestro', async (req, res) => {
    try {
        const key = req.query.key as string;
        // Capturamos la fecha que escribiste en Postman para filtrar en Supabase
        const fechaManual = req.query.fecha_corte as string; 

        const LLAVE_MAESTRA = process.env.ADMIN_SECRET_KEY || 'therollingstones';

        if (key !== LLAVE_MAESTRA) {
            return res.status(401).json({ error: 'Llave incorrecta' });
        }

        // Ejecutamos la funcion completarPropiedadRespuesta (la version que va de a uno)
        // No usamos 'await' aqui para que la respuesta de Express sea inmediata
        procesarCotiSimple()
            .then(() => console.log("✅ Carga masiva terminada con exito"))
            .catch((err: any) => console.error("❌ Error en el proceso masivo:", err));
        // Respondemos al cliente que el proceso ya arranco
        res.status(202).json({ 
            mensaje: "🚀 Proceso iniciado",
        });

    } catch (error) {
        console.error("Error al iniciar el endpoint:", error);
        res.status(500).json({ error: "Error al iniciar el proceso en el servidor" });
    }
});

export { router };