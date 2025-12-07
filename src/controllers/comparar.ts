import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

// Cambiamos a POST para recibir el contenido HTML en el body
export const createFile = async (req: Request, res: Response) => {
    // 🛑 1. OBTENER EL CONTENIDO HTML DEL CUERPO DE LA SOLICITUD
    const htmlContent = req.body.htmlContent; 
    
    if (!htmlContent) {
        return res.status(400).send("Falta el contenido HTML en el cuerpo de la solicitud (htmlContent).");
    }

    let browser;
    try {
        // Lanzar Puppeteer con argumentos ESENCIALES para entornos Linux/Docker
        browser = await puppeteer.launch({
            // 🛑 MODIFICACIÓN CLAVE: Argumentos para ejecución en Linux/Docker
        // Prueba estas rutas. Comenta la que no uses. 
    // Una de estas es la ubicación típica del binario en imágenes Debian 'slim'
       executablePath: '/usr/bin/chromium', 
    // executablePath: '/usr/bin/google-chrome',   
            args: [
                '--no-sandbox',            // Obligatorio en la mayoría de los entornos Linux
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // Resuelve problemas de memoria en contenedores Docker (Alpine)
                '--disable-gpu',
            ],
            timeout: 60000, // <--- Aumentar el timeout global a 60 segundos
            // Si usas puppeteer-core en Docker, podrías necesitar especificar la ruta al binario.
            // Pero si la imagen base se arregla (ej: slim/debian), no debería ser necesario.
        });
        
        const page = await browser.newPage();
        
        // 2. ESTABLECER EL CONTENIDO HTML DIRECTAMENTE
        await page.setContent(htmlContent, {
            // Esperar a que los estilos e imágenes se carguen
            waitUntil: 'domcontentloaded', // <-- CAMBIAR A UN MODO MENOS ESTRICTO
            timeout: 60000, // <--- Aumentar el timeout aquí también
        }); 

        // 3. GENERAR EL PDF
        const pdfBuffer = await page.pdf({
            // Ajustes del documento PDF
            format: 'A4',
            printBackground: true, // Incluye colores y fondos CSS
            margin: {
                top: '20mm',
                right: '10mm',
                bottom: '20mm',
                left: '10mm',
            }
        });
        
        // Cerrar el navegador
        await browser.close();

        // 4. ENVIAR EL BUFFER DEL PDF COMO RESPUESTA
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="comparacion-planes.pdf"');
        res.send(pdfBuffer);
        
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        
        // Asegúrate de cerrar el navegador si falla
        if (browser) {
            await browser.close();
        }
        
        res.status(500).send("Error interno al generar el PDF.");
    }
};