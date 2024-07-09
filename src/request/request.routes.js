import { Router } from "express";
import { validate } from "../middlewares/validate-field.js";
import { requestSchema } from "../middlewares/request.validators.js";
import { post, get, getOne, remove } from "./request.controller.js";

const router = Router();

router.post('/post', [
    validate(requestSchema),
], post);

router.get('/get', get);
router.get('/getOne', getOne);
router.delete('/remove/:id', remove);

export default router;