import { Router } from "express";
import * as express from "express";
import { obtenerPlanesConClinicas } from '../services/planes';

const router = Router();

router.use(express.json());
router.get('/',() => { obtenerPlanesConClinicas();});

 
export { router }


