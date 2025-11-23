import { Router } from "express";
import * as express from "express";
import { groupClinics } from '../controllers/compararclinicas'; 

const router = Router();

router.use(express.json());

router.post('/', (req, res) => { groupClinics(req, res); }); 

export { router };