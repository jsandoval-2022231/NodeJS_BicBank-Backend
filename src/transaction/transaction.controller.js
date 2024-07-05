import Transaction from './transaction.model.js';
import Account from '../account/account.model.js';
import createController from '../services/http.services.js';

const transactionController = createController(Model);

/*Genericos */

export const get = transactionController.getAll;
export const remove = transactionController.remove;
export const update = transactionController.update;
export const getOne = transactionController.getOne;

/*/*Especificos */

export const makeTransaction = async (req, res) => {
    try {
        const { originAccount, destinationAccount, amount } = req.body;
        const noReference = Math.floor(Math.random() * 1000000);
        const origin = await Account.findOne({ accountNumber: originAccount });

        if (origin.limitTransaction < amount){
            return res.status(400).json({ error: 'Transaction limit exceeded' });
        }
        const destination = await Account.findOne({ accountNumber: destinationAccount });
        if (!origin || !destination) {
            return res.status(400).json({ error: 'Accounts not found' });
        }
        if (origin.balance < amount) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }
        origin.balance -= amount;
        const transaction = new Transaction({ amount, destinationAccount, noReference });
        origin.transaction.push(transaction);
        destination.balance += amount;
        await origin.save();
        await destination.save();
        return res.status(200).json({ message: 'Transaction completed successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// export const makeTransaction = async (req, res) => {
//     try {
//         const { originAccount, destinationAccount, amount } = req.body;
//         const noReference = Math.floor(Math.random() * 1000000);
//         const origin = await Account.findOne({ accountNumber: originAccount });

//         if (origin.limitTransaction < amount)
//             return res.status(400).json({ error: 'Transaction limit exceeded' });

//         const destination = await Account.findOne({ accountNumber: destinationAccount });
//         if (!origin || !destination) {
//             return res.status(400).json({ error: 'Accounts not found' });
//         }
//         if (origin.balance < amount) {
//             return res.status(400).json({ error: 'Insufficient funds' });
//         }
//         origin.balance -= amount;
//         origin.transaction.push({ amount, destinationAccount, noReference });
//         destination.balance += amount;
//         await origin.save();
//         await destination.save();
//         return res.status(200).json({ message: 'Transaction completed successfully' });
//     }
//     catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

