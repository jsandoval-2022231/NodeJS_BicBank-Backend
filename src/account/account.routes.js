import { Router } from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/validate-field.js";
import { get, getAccountByNumber, getAccountByUser, getOne, remove, update, addAndAccountToFavorites, removeAccountFromFavorites, getTransaccionsByNoAccount } from "./account.controller.js";

const router = Router();

router.post('/addFavorite', addAndAccountToFavorites);
router.delete('/removeFavorites', removeAccountFromFavorites);

router.get('/get', get);
router.get('/getOne/:id', getOne);
router.get('/getAccountByNumber', getAccountByNumber);
router.get('/getAccountByUser', getAccountByUser);
router.get('/getTransactions', getTransaccionsByNoAccount);

router.put('/update/:id', update);
router.delete('/remove/:id', remove);

export default router;