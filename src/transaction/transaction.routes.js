import { Router } from 'express';
import { post, getAll, getOne, update, remove } from './transaction.controller.js';
import { validate } from '../middlewares/validate-field.js';
import { createTransactionSchema } from '../middlewares/transaction.validators.js';

const router = Router();

router.post('/post', validate(createTransactionSchema), post);
router.get('/', getAll);
router.get('/:id', getOne);

//router.put('/:id', validate(updateTransactionSchema), update);
router.delete('/:id', remove);

export default router;
