import createController from '../services/http.services.js';
import Transaction from './transaction.model.js';
import { processTransaction } from '../services/transaction.service.js';

const customPostLogic = async (req, res) => {
  const { accountOrigin, accountDestination, amount } = req.body;
  const transaction = await processTransaction(accountOrigin, accountDestination, amount);
  return { message: 'Transaction completed successfully', transaction };
};

const transactionController = createController(Transaction, customPostLogic);

/* Generic */
export const post = transactionController.post;
export const getAll = transactionController.getAll;
export const getOne = transactionController.getOne;
export const update = transactionController.update;
export const remove = transactionController.remove;


