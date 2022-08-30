import { Router } from "express";
import CartController from "../controllers/cart";
import ProductController from "../controllers/product";


const cartRouter =  Router();

cartRouter
    .get('/', CartController.getAll)
    .get('/:id', CartController.getOne)
    .put('/:id', CartController.update)
    .delete('/:id', CartController.delete)
    .post('/', CartController.create)

export default cartRouter