import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    reference: {
        type: String,
        required: true
    },
    accountOrigin: {
        type: String,
        required: true
    },
    accountDestination: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Transaction", TransactionSchema);