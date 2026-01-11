"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// En tu archivo de rutas (ej: routes.ts o index.ts)
const express_1 = require("express");
const generarCotizaciones_1 = require("../services/generarCotizaciones"); // Ajustá el path
const router = (0, express_1.Router)();
// Key: fecha_corte
// Value: 2026-01-08T23:59:59 (Por ejemplo, si querés procesar todo lo que se haya hecho antes de la medianoche de hoy).
// La URL en Postman se vería así: .../generar-maestro?key=therollingstones&fecha_corte=2026-01-08T23:59:59
router.post('/generar-maestro', async (req, res) => {
    try {
        const key = req.query.key;
        // Capturamos la fecha que escribiste en Postman
        const fechaManual = req.query.fecha_corte;
        const LLAVE_MAESTRA = process.env.ADMIN_SECRET_KEY || 'therollingstones';
        if (key !== LLAVE_MAESTRA) {
            return res.status(401).json({ error: 'Llave incorrecta' });
        }
        // Se la pasamos a la función procesarTodo
        (0, generarCotizaciones_1.procesarTodo)(fechaManual)
            .then(() => console.log("Carga masiva terminada"))
            .catch(err => console.error("Error:", err));
        res.status(202).json({
            mensaje: "🚀 Proceso iniciado",
            objetivo: fechaManual ? `Rehacer todo lo anterior a ${fechaManual}` : "Sincronizar pendientes"
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error al iniciar" });
    }
});
//# sourceMappingURL=admin.js.map