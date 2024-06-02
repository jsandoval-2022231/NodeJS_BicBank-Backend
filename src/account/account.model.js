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
        required: true
    },
    typeAccount: {
        type: String,
        enum: ["debit", "credit"],
        default: "debit"
    },
    favorite: [
        {
            "accountNumber": Number,
            "DPI": Number,
            "alias": "String"
        }
    ],
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
    },
    discount: {
        type: Number,
        required: false
    }
});

export default mongoose.model("Account", AccountSchema);