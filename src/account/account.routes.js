import { Router } from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/validate-field.js";
import { get, getAccountByNumber, getAccountByUser, getOne, getTransactions, remove, update } from "./account.controller.js";

const router = Router();

router.get('/get', get);
router.get('/getOne/:id', getOne);
router.get('/getAccountByNumber', getAccountByNumber);
router.get('/getAccountByUser', getAccountByUser);
router.get('/getTransactions/:accountNumber', getTransactions);

router.put('/update/:id', update);
router.delete('/remove/:id', remove);