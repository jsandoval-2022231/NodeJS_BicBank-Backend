import axios from 'axios';

export const getExchangeRates = async (baseCurrency) => {
    try {
        const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
        const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
        const response = await axios.get(`${BASE_URL}/latest/${baseCurrency}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching exchange rates');
    }
}
