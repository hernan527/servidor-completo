import { Router } from "express";
import * as express from "express";

const router = Router();

router.use(express.json());

router.get("/",(req,res) => {
const htmlResponse =`
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QUOTE</title>
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

export { router }