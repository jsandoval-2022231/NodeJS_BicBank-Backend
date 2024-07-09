import Transaction from '../transaction/transaction.model.js';
import Account from '../account/account.model.js';

export const processTransaction = async (accountOrigin, accountDestination, amount) => {
    const reference = Math.floor(Math.random() * 1000000);
    const origin = await Account.findOne({ accountNumber: accountOrigin });

    const currentTime = new Date();
    const lastResetTime = new Date(origin.lastTransactionReset);
    const timeDifference = currentTime - lastResetTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= 24) {
        origin.limitTransaction = 0; 
        origin.lastTransactionReset = currentTime; 
    }

    if (amount > 2000){
        throw new Error('Transaction limit exceeded you can only make transactions of 2000 or less555');
    }

    if ((origin.limitTransaction + amount) > 10000) {
        throw new Error('Transaction limit exceeded');
    }

    const destination = await Account.findOne({ accountNumber: accountDestination });
    if (!origin || !destination) {
        throw new Error('Accounts not found');
    }
    if (origin.balance < amount) {
        throw new Error('Insufficient funds');
    }

    origin.balance -= amount;
    const transaction = new Transaction({ amount, accountDestination, accountOrigin, reference });
    origin.transaction.push(transaction);
    destination.balance += amount;

    origin.limitTransaction += amount;

    await transaction.save();
    await origin.save();
    await destination.save();

    return transaction;
};
