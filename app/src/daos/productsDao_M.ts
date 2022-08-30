import ContainerMonogoDb from "../containers/containerMongoDb";
import Product, { IProduct } from "../models/product";
class ProductsDao_M extends ContainerMonogoDb {
    constructor(){
        super(Product);
    }
}

export default ProductsDao_M