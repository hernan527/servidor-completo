import { Router } from "express";

import * as express from "express";
import { fileUpload } from '../controllers/uploads';

const router = Router();


router.post('/', fileUpload);

export { router }

