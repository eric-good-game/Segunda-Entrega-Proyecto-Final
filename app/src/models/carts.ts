import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product";

export interface ICart {
    products: IProduct[];
    user_id: string;
    // user_id: { type: Schema.Types.ObjectId, ref: 'Users' };
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    total: number;
}

const cartSchema = new Schema<ICart>({
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    user_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
})

const Cart = mongoose.model<ICart>('Carts', cartSchema);

export default Cart