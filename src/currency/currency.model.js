import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema({
    base: String,
    rates: Map,
    last_updated: Date
});

export default mongoose.model('Currency', currencySchema);
