import { Router } from "express";
import * as express from "express";
import {  createFile } from '../controllers/convert';

const router = Router();

router.use(express.json());


// Ruta que genera la imagen
router.get('/', (req, res) => {
    createFile(req, res);
}); 

export { router };
