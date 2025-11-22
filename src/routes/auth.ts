import { Request, Response, Router } from "express";
import { regsiterCtrl, loginCtrl } from "../controllers/auth";

const router = Router();

/** http://localhost:3002/auth/register [POST] */

router.post("/register",regsiterCtrl);
router.post("/login",loginCtrl);

export { router } 