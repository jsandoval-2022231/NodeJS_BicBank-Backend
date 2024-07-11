import { getExchangeRates } from '../services/currency.service.js';
import User from '../user/user.model.js';

export const convertBalanceToUSD = async (req, res) => {
    try {
        const userId = req.user;

        const user = await User.findById(userId).populate('account');
        if (!user || !user.account) {
            return res.status(404).json({ error: 'User not found' });
        }

        const balanceGTQ = user.account.balance;
        //console.log('Balance in GTQ:', balanceGTQ);

        const rates = await getExchangeRates('GTQ');
        //console.log('Exchange rates:', rates);
        const rateGTQtoUSD = rates.conversion_rates.USD;
        //console.log('Rate GTQ to USD:', rateGTQtoUSD);

        const balanceUSD = balanceGTQ * rateGTQtoUSD;
        //console.log('Balance in USD:', balanceUSD);

        res.json({ balanceGTQ, balanceUSD });
    } catch (error) {
        console.error('Error in convertBalanceToUSD:', error.message);
        res.status(500).json({ error: error.message });
    }
};
