import { Router } from "express";
import * as express from "express";
import {  createFile } from '../controllers/comparar';

const router = Router();

router.use(express.json());

// 🛑 CAMBIAR a POST para recibir el HTML en el body
router.post('/', createFile); 

export { router };