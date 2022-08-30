import mongoose, { Schema } from "mongoose";

export interface IProduct extends mongoose.Document {
    name: string;
    price: number;
    // description: string;
    image: string;
    stock: number;
}

const productSchema = new Schema<IProduct>({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:String, required:true},
    stock:{type:Number, required:true},
    // description:{type:String, required:true},
});

const Product = mongoose.model<IProduct>('Products', productSchema);

export default Product;
