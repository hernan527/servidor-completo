import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

export const createFile = async (req: Request, res: Response) => {
    // Ruta temporal para guardar el HTML
    const htmlFilePath = path.join(__dirname, '../controllers', 'temp.html');
    const outputImagePath = path.join(__dirname, '../controllers', 'simple.png');

    // Crear el archivo HTML (puedes modificar el contenido según sea necesario)
    const htmlContent = `
        <html>
            <body>
                <h1>Hola desde Puppeteer</h1>
                <p>Esta es una prueba de generación de imagen.</p>
            </body>
        </html>
    `;

    fs.writeFileSync(htmlFilePath, htmlContent);

    try {
        // Lanzar Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Cargar el archivo HTML
        await page.goto(`file://${htmlFilePath}`);
        
        // Generar la imagen
        await page.screenshot({ path: outputImagePath });
        
        // Cerrar el navegador
        await browser.close();

        // Enviar la imagen como respuesta
        res.sendFile(outputImagePath, (err) => {
            if (err) {
                res.status(500).send("Error al enviar la imagen.");
            }
            // Opcional: eliminar el archivo después de enviarlo
            fs.unlinkSync(htmlFilePath);
            fs.unlinkSync(outputImagePath);
        });
    } catch (error) {
        console.error("Error al generar la imagen:", error);
        res.status(500).send("Error al generar la imagen.");
    }
};
