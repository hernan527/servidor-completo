
import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes"
import dbConnect from "./config/mongo";
import bodyParser from 'body-parser';
import path from 'path';

const PORT = process.env.PORT || 3001;

// const os = require('os');
// const networkInterfaces = os.networkInterfaces();
// const ipv6Address = networkInterfaces["vEthernet (Default Switch)"][0].address;
// const appaddress = 'http://['+ipv6Address+']:'+PORT+'/';


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
  const portRegex = /^http:\/\/localhost(?::\d+)?$/;
  
  const filteredWhitelist = whitelist.filter((origin) => portRegex.test(origin));
  
 

const app = express()
app.use(cors({
      origin: '*',

    // origin: filteredWhitelist,
    allowedHeaders: ['Authorization', 'Content-Type']

  }));
  
  app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
        "default-src 'self'; " +
        "img-src 'self' https://cotizador.tuchat.com.ar http://localhost:5200; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "connect-src 'self'; " +
        "font-src 'self';"  // Permitir fuentes del mismo origen
    );
    next();
});

app.get("/test", (req, res) => {
  res.send("Esta es una prueba.");
});

  app.use(express.static(path.join(__dirname, 'public')));
  // Servir archivos estáticos desde la carpeta "public"
  app.get("/",(req,res) => {
    const htmlResponse =`
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página Web</title>
    <style>
        /* Estilos CSS van aquí */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
        }
        /* Agrega más estilos según tus necesidades */
    </style>
</head>
<body>

<header>
    <h1>Bienvenido a mi página web</h1>
</header>

<main>
    <p>Aquí puedes empezar a escribir el contenido de tu página web.</p>
</main>

<footer>
    <p>© 2024 Mi Página Web</p>
</footer>

</body>
</html>

    `;
    res.send(htmlResponse)
  });
app.use(express.json())
app.use(router);
app.use(bodyParser.json({ limit: '50mb' })); // Puedes ajustar el límite según tus necesidades
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

dbConnect().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:` + PORT + `...`);
      // console.log(`Web application public URL :  ` + appaddress);


    });
  })
  .catch(error => console.error(error));
export default app