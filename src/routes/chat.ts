import { Router } from "express";
import * as express from "express";
import { getItemsIA, getItemsPlanesIA,getClinicasPorRegionesIA } from '../controllers/chat';

const router = Router();

router.use(express.json());
router.get('/clinicas',(req, res) => { getItemsIA(req, res);});
router.get('/planes',(req, res) => { getItemsPlanesIA(req, res);});
router.get('/clxregion',(req, res) => {  getClinicasPorRegionesIA(req, res);});
export { router }


