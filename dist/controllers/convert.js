"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const createFile = async (req, res) => {
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
        const browser = await puppeteer_1.default.launch();
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
    }
    catch (error) {
        console.error("Error al generar la imagen:", error);
        res.status(500).send("Error al generar la imagen.");
    }
};
exports.createFile = createFile;
//# sourceMappingURL=convert.js.map