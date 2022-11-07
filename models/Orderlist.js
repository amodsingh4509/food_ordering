import mongoose from "mongoose";

const OrderlistSchema = new mongoose.Schema(
    {
        productimg: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        extra: {
            type: [String],
        },
        quantity: {
            type: Number,
            required: true,
        },
        orderid:{
            type:String,
            required:true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Orderlist || mongoose.model("Orderlist", OrderlistSchema);
