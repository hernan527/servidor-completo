"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const generarCotizaciones_1 = require("../services/generarCotizaciones");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * Endpoint para disparar la carga masiva
 * URL: .../generar-maestro?key=therollingstones&fecha_corte=2026-01-14T23:59:59
 * curl http://localhost:3/generar-maestro?key=therollingstones&
 */
router.post('/generar-maestro', async (req, res) => {
    try {
        const key = req.query.key;
        // Capturamos la fecha que escribiste en Postman para filtrar en Supabase
        const fechaManual = req.query.fecha_corte;
        const LLAVE_MAESTRA = process.env.ADMIN_SECRET_KEY || 'therollingstones';
        if (key !== LLAVE_MAESTRA) {
            return res.status(401).json({ error: 'Llave incorrecta' });
        }
        // Ejecutamos la funcion completarPropiedadRespuesta (la version que va de a uno)
        // No usamos 'await' aqui para que la respuesta de Express sea inmediata
        (0, generarCotizaciones_1.procesarCotiSimple)()
            .then(() => console.log("✅ Carga masiva terminada con exito"))
            .catch((err) => console.error("❌ Error en el proceso masivo:", err));
        // Respondemos al cliente que el proceso ya arranco
        res.status(202).json({
            mensaje: "🚀 Proceso iniciado",
        });
    }
    catch (error) {
        console.error("Error al iniciar el endpoint:", error);
        res.status(500).json({ error: "Error al iniciar el proceso en el servidor" });
    }
});
//# sourceMappingURL=admin.js.map