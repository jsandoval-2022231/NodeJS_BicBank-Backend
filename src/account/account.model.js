import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    limitTransaction: {
        type: Number,
        default: 0
    },
    lastTransactionReset: {
        type: Date,
        default: Date.now
    },
    typeAccount: {
        type: String,
        enum: ["DEBIT", "CREDIT"],
        default: "DEBIT"
    },
    transaction: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Transaction"
    },
    favorite: [
        {
            "accountNumber": Number,
            "DPI": Number,
            "alias": String
        }
    ],
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
    },
    discount: {
        type: Number,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }

});

export default mongoose.model("Account", AccountSchema);