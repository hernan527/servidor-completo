// En tu archivo de rutas (ej: routes.ts o index.ts)
import { Router } from 'express';
import { procesarTodo } from '../services/generarCotizaciones'; // Ajustá el path

const router = Router();

router.post('/generar-maestro', async (req, res) => {
    try {
        const { key } = req.query;
        const LLAVE_MAESTRA = process.env.ADMIN_SECRET_KEY || 'tu_clave_secreta_123';

        if (key !== LLAVE_MAESTRA) {
            return res.status(401).json({ error: 'Llave incorrecta' });
        }

        // Ejecutamos el proceso
        // No usamos 'await' aquí para que la respuesta sea inmediata
        procesarTodo()
            .then(() => console.log("Carga masiva terminada"))
            .catch(err => console.error("Error en carga masiva:", err));

        // Respondemos a Postman de inmediato
        res.status(202).json({ 
            mensaje: "🚀 Proceso iniciado en segundo plano",
            info: "Podés cerrar Postman. Mirá la consola del servidor para ver el progreso."
        });

    } catch (error) {
        res.status(500).json({ error: "Error al iniciar el proceso" });
    }
});

export { router };