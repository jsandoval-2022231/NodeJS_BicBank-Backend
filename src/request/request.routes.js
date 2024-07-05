import { Router } from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/validate-field.js";
import { post, get, getOne, remove } from "./request.controller.js";

const router = Router();

router.post('/post', [
    check('name', 'Name is required').not().isEmpty(),
    check('nickname', 'Nickname is required').not().isEmpty(),
    check('DPI', 'El DPI is required').not().isEmpty(),
    check('direction', 'La dirección is required').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('phone', 'El teléfono es obligatorio').not().isEmpty(),
    check('income', 'El ingreso es obligatorio').not().isEmpty(),
    check('workName', 'El nombre del trabajo es obligatorio').not().isEmpty(),
    check('typeAccount', 'El tipo de cuenta es obligatorio').not().isEmpty(),
    check('workDirection', 'La dirección del trabajo es obligatoria').not().isEmpty(),
    validate
], post);

router.get('/get', get);
router.get('/getOne', getOne);
router.delete('/remove/:id', remove);

export default router;