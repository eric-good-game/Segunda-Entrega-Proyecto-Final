import { Request, Response } from "express";
import {cartsDao} from "../daos";
import {ICart} from "../models/carts";

class CartController {
    static async getAll (req:Request,res:Response){
        try {
            const carts = await cartsDao.getAll();
            res.json(carts)            
        } catch (err) {
            console.log(err);
        }
    }
    static async getOne (req:Request,res:Response){
        try {            
            const cart = await cartsDao.getById(req.params.id);
            if(!cart){
                res.status(404).send('Cart not found');
                return
            }
            res.json(cart)
        } catch (err) {
            console.log(err);
        }
    }
    static async update (req:Request,res:Response){
        try {
            const cart = await cartsDao.update(req.params.id, req.body);
            if(!cart){
                res.status(404).send('Cart not found');
                return
            }
            res.json(cart)
        } catch (err) {
            console.log(err);
        }
    }
    static async delete (req:Request,res:Response){
        try {
            const cart = await cartsDao.delete(req.params.id);
            res.json(cart)
        } catch (err) {
            console.log(err);
        }
    }
    static async create (req:Request,res:Response){
        // if(!req.body.user_id){
        //     res.status(400).send("user_id is required")
        //     return
        // }
        try {
            const cartData = {
                total:0,
                quantity:0,
                products:[],
                user_id:'001',
                createdAt:new Date(),
                updatedAt:new Date()
            }
            const cart = await cartsDao.create(cartData);
            res.json(cart)
        } catch (err) {
            console.log(err);
        }
    }
}

export default CartController