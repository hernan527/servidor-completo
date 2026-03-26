import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import dbConnect from "./config/mongo";
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. CONFIGURACIÓN DE CORS
const whitelist = [
    'http://localhost:4200',
    'http://localhost:4300',
    'http://localhost:4400',
    'http://localhost:4500',
    'https://sakai-ng-front.vercel.app',
    'https://soloclinic.vercel.app',
    'https://front-prepagas.vercel.app',
    'https://n8n.tuchat.com.ar',
    'https://n8nwebhook.tuchat.com.ar',
    'https://type.tuchat.com.ar',
    'https://typeapi.tuchat.com.ar'
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir peticiones sin origen (como Postman o curl) o en la whitelist
        if (!origin || whitelist.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
}));

// 2. MIDDLEWARES DE PARSEO (DEBEN IR ANTES DE LAS RUTAS)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Nota: bodyParser ya está incluido en express moderno, pero lo mantenemos por tu compatibilidad
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 3. SEGURIDAD CSP (CORREGIDA PARA NO BLOQUEAR TU FRONT)
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
        "default-src 'self'; " +
        "img-src 'self' data: https://cotizador.tuchat.com.ar http://localhost:5200; " +
        "script-src 'self' 'unsafe-inline'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "connect-src 'self' https://servidorplus.saludok.com.ar https://*.vercel.app http://localhost:*; " + 
        "font-src 'self';"
    );
    next();
});

// 4. ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// 5. RUTAS DE PRUEBA Y HOME
app.get("/test", (req, res) => {
    res.send("Esta es una prueba funcionando.");
});

app.get("/", (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Servidor SaludOK</title>
        <style>
            body { font-family: sans-serif; text-align: center; padding: 50px; background: #f4f4f4; }
            header { background: #333; color: white; padding: 20px; border-radius: 10px; }
        </style>
    </head>
    <body>
        <header><h1>Bienvenido al Servidor de SaludOK</h1></header>
        <main><p>API funcionando correctamente.</p></main>
    </body>
    </html>`;
    res.send(htmlResponse);
});

// 6. CARGA DE RUTAS DEL SISTEMA (SIEMPRE DESPUÉS DE LOS MIDDLEWARES)
app.use(router);

// 7. CONEXIÓN A DB Y ARRANQUE
dbConnect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("❌ Error de conexión a la DB:", error);
        process.exit(1); // Cerrar si no hay base de datos
    });

export default app;
