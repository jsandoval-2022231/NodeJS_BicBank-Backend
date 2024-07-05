import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validateJWT } from "../helpers/validate-jwt.js";


const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
], login);

export default router;