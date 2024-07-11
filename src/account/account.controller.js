import AccountModel from "./account.model.js";
import createController from "../services/http.services.js";

const accountController = createController(AccountModel);

/* Genericos */
export const get = accountController.getAll;
export const remove = accountController.remove;
export const update = accountController.update;
export const getOne = accountController.getOne;

/* Especificos */
export const addAndAccountToFavorites = async (req, res) => {
    try { 
        const { accountNumber, DPI, alias } = req.body;
        const account = await AccountModel.findOne({ accountNumber: accountNumber });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.favorite.push({ accountNumber, DPI, alias });
        await account.save();
        return res.status(200).json({ message: 'Account added to favorites' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const removeAccountFromFavorites = async (req, res) => {
    try {
        const { accountNumber, DPI } = req.body;
        const account = await AccountModel.findOne({ accountNumber: accountNumber });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        account.favorite = account.favorite.filter(favorite => favorite.DPI === DPI);
        await account.save();
        return res.status(200).json({ message: 'Account removed from favorites' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAccountByNumber = async (req, res) => {
    try {
        const accountNumber = req.body.accountNumber;
        const account = await AccountModel.findOne({ accountNumber: accountNumber });
        return res.status(200).json({ account });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAccountByUser = async (req, res) => {
    try {
        const user = req.body.user;
        const account = await AccountModel.findOne({ user: user });
        return res.status(200).json({ account });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


/*
    El administrador al momento de ver los usuarios podrá ver el saldo disponible en su cuenta, así como los 
    últimos 5 movimientos realizado en esa cuenta. Podrá gestionar productos o servicios, los productos 
    pueden ser cuestiones generales, entiéndase desde zapatos hasta servicio de peluquería. El objetivo de 
    estos productos o servicios es que sean únicos y exclusivos para los clientes del banco.

*/

export const getTransaccionsByNoAccount = async (req, res) => {
    try {
        const accountNumber = req.body.accountNumber;
        const account = await AccountModel
            .findOne({ accountNumber: accountNumber })
            .populate('transaction');
        return res.status(200).json({ transaction: account.transaction });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAccountDetails = async (req, res) => {
    try {
        const accountNumber = req.body.accountNumber;
        const account = await AccountModel.findOne({ accountNumber: accountNumber });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Obtener los últimos 5 movimientos
        const lastFiveTransactions = account.transaction.slice(-5).reverse();

        return res.status(200).json({
            balance: account.balance,
            transactions: lastFiveTransactions
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default accountController;