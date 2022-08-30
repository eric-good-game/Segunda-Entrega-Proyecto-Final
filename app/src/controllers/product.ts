import { Request, Response } from "express";
import {productsDao} from "../daos";

class ProductController {
    static async getAll (req:Request,res:Response){
        try {
            const products = await productsDao.getAll();
            res.json(products)
        } catch (err) {
            console.log(err);
        }
    }
    static async getOne (req:Request,res:Response){
        try {            
            const product = await productsDao.getById(req.params.id);
            if(!product){
                res.status(404).send('Product not found');
                return
            }
            res.json(product)
        } catch (err) {
            console.log(err);
            
        }
    }
    static async update (req:Request,res:Response){
        try {            
            const product = await productsDao.update(req.params.id, req.body);
            if(!product){
                res.status(404).send('Product not found');
                return
            }
            res.json(product)
        } catch (err) {
            console.log(err);
        }
    }
    static async delete (req:Request,res:Response){
        try {
            const product = await productsDao.delete(req.params.id);
            res.json(product)
        } catch (err) {
            console.log(err);
        }
    }
    static async create (req:Request,res:Response){
        try {
            const product = await productsDao.create(req.body);
            res.json(product)
        } catch (err) {
            console.log(err);
        }
    }
}

export default ProductController