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
        // Lanzar Puppeteer (puede requerir la opción 'args' si usas entornos serverless o Docker)
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // 2. ESTABLECER EL CONTENIDO HTML DIRECTAMENTE
        await page.setContent(htmlContent, {
            // Esperar a que los estilos e imágenes se carguen
            waitUntil: 'networkidle0' 
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
            // Puedes añadir headerTemplate y footerTemplate aquí si es necesario
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