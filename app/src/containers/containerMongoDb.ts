import mongoose from "mongoose";
import { ICart } from "../models/carts";
import { IProduct } from "../models/product";

type Model = mongoose.Model<IProduct | ICart>; 

class ContainerMonogoDb {
    collection:Model;

    constructor(collection:any){
        this.collection = collection;
    }

    async getAll() {
        try {            
            return await this.collection.find();
        } catch (err) {
            console.log(err);   
        }
    }

    async getById(id:string) {
        try {
            return await this.collection.findById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async create(item:ICart|IProduct) {
        try { 
            return await this.collection.create(item);
        } catch (err) {
            console.log(err);
            
        }
    }
    async update(id:string, data:Partial<ICart| IProduct>) {
        try {
            return await this.collection.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id:string) {
        try {
            return await this.collection.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
        }
    }

}

export default ContainerMonogoDb;