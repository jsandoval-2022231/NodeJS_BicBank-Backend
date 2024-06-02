import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
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
    password: {
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
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    role: {
        type: String,
        enum: ["USER_ROLE", "ADMIN_ROLE"],
        default: "USER_ROLE"
    }
});

export default mongoose.model("User", UserSchema);