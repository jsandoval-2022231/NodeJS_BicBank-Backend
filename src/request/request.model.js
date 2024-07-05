import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    DPI: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    workName: {
        type: String,
        required: false
    },
    workDirection: {
        type: String,
        required: false
    },
    income: {
        type: Number,
        required: true
    },
    typeAccount: {
        type: String,
        enum: ["DEBIT", "CREDIT"],
        default: "DEBIT"
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Request", RequestSchema);