import { Router } from "express";
import ProductController from "../controllers/product";


const productRouter =  Router();

productRouter
    .get('/', ProductController.getAll)
    .get('/:id', ProductController.getOne)
    .put('/:id', ProductController.update)
    .delete('/:id', ProductController.delete)
    .post('/', ProductController.create)

export default productRouter