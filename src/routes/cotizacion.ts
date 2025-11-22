import { Router } from "express";
import * as express from "express";
import { getPrecios} from '../controllers/cotizacion';

const router = Router();

router.use(express.json());
router.post('/',getPrecios);
  
  
export { router }





