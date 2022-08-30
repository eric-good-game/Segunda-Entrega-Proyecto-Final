import { Router } from "express";
import cartRouter from "./carts";
import productRouter from "./products";


const rootRouter = Router();

rootRouter.use('/api/products',productRouter)
rootRouter.use('/api/carts',cartRouter)

export default rootRouter