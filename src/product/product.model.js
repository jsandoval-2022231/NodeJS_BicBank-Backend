import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    discount: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Product", ProductSchema);