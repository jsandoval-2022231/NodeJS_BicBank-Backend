import accountModel from "./account.model";
import createController from "../services/http.services.js";

const accountController = createController(accountModel);

/* Genericos */
export const get = accountController.getAll;
export const remove = accountController.remove;
export const update = accountController.update;
export const getOne = accountController.getOne;

/* Especificos */

export const getAccountByNumber = async (req, res) => {
    try {
        const accountNumber = req.body.accountNumber;
        const account = await accountModel.findOne({ accountNumber: accountNumber });
        return res.status(200).json({ account });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAccountByUser = async (req, res) => {
    try {
        const user = req.body.user;
        const account = await accountModel.findOne({ user: user });
        return res.status(200).json({ account });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getTransactions = async (req, res) => {
    try {
        const accountNumber = req.body.accountNumber;
        const account = await accountModel.findOne({ accountNumber: accountNumber });
        return res.status(200).json({ transactions: account.transaction });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export default accountController;