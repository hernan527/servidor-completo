// En tu archivo de rutas (ej: routes.ts o index.ts)
import { Router } from 'express';
import { procesarTodo } from '../services/generarCotizaciones'; // Ajustá el path

const router = Router();

// Key: fecha_corte

// Value: 2026-01-08T23:59:59 (Por ejemplo, si querés procesar todo lo que se haya hecho antes de la medianoche de hoy).

// La URL en Postman se vería así: .../generar-maestro?key=therollingstones&fecha_corte=2026-01-08T23:59:59
router.post('/generar-maestro', async (req, res) => {
    try {
        // 1. Usar Headers para la seguridad
        const key = req.headers['x-admin-key'];
        const fechaManual = req.query.fecha_corte as string; 

        const LLAVE_MAESTRA = process.env.ADMIN_SECRET_KEY || 'therollingstones';

        if (key !== LLAVE_MAESTRA) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        // 2. Validación básica de fecha
        if (fechaManual && isNaN(Date.parse(fechaManual))) {
            return res.status(400).json({ error: 'Formato de fecha inválido. Usar ISO 8601.' });
        }

        // 3. Ejecución controlada
        // Mantenemos el proceso asíncrono pero con un log más limpio
        console.log(`[Admin] Inicio de proceso solicitado para: ${fechaManual || 'Pendientes'}`);
        
        procesarTodo(fechaManual)
            .then(() => console.log("✅ Carga masiva terminada con éxito"))
            .catch(err => {
                // Aquí podrías enviar un email al admin o guardar en una tabla de logs
                console.error("❌ Error crítico en procesarTodo:", err);
            });

        // Respondemos que fue aceptado
        res.status(202).json({ 
            mensaje: "🚀 Proceso en segundo plano iniciado",
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Error en el endpoint:", error);
        res.status(500).json({ error: "Error interno al procesar la solicitud" });
    }
});

export { router }
