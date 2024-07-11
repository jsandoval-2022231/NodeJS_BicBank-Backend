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
    destination.transaction.push(transaction);

    await transaction.save();
    await origin.save();
    await destination.save();

    return transaction;
};

export const revertTransactionBefore1Minute = async (transactionId) => {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
        throw new Error('Transaction not found');
    }
    const currentTime = new Date();
    const transactionTime = new Date(transaction.createdAt);
    const timeDifference = currentTime - transactionTime;
    const minutesDifference = timeDifference / (1000 * 60);

    if (minutesDifference > 1) {
        throw new Error('You can only revert transactions made in the last minute');
    }

    const origin = await Account.findOne({ accountNumber: transaction.accountOrigin });
    const destination = await Account.findOne({ accountNumber: transaction.accountDestination });

    origin.balance += transaction.amount;
    origin.transaction = origin.transaction.filter(t => t._id.toString() !== transactionId);
    destination.balance -= transaction.amount;
    destination.transaction = destination.transaction.filter(t => t._id.toString() !== transactionId);

    await origin.save();
    await destination.save();

    await Transaction.findByIdAndDelete(transactionId);

    return { message: 'Transaction reverted successfully' };
}