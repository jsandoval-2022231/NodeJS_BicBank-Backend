import { Router } from "express";
// import { fetchExchangeRates } from "./currency.controller.js";
import { convertBalanceToUSD } from './currency.controller.js';
import { validateJWT } from '../helpers/validate-jwt.js';

const router = Router();

// router.get('/exchange-rates/:base', fetchExchangeRates);
router.get('/convert-balance/', validateJWT, convertBalanceToUSD);

export default router;
