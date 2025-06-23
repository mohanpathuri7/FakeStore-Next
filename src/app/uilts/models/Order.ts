import mongoose, { Document, Schema } from "mongoose";

interface IOrder extends Document {
    stripePaymentIntentId: string;
    email: string;
    amount: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[];
    createdAt: Date;
}

const OrderSchema: Schema = new mongoose.Schema({
    stripePaymentIntentId: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    items: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
});


const OrderModel =
    mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
