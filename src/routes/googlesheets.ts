import { Router } from "express";
import * as express from "express";
import { getItems} from '../controllers/googlesheets';

const router = Router();

router.use(express.json());
router.get('/', (req, res) => {getItems(req, res) });
  
  
export { router }