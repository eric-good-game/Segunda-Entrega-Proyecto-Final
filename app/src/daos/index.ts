import CartsDao_F from "./cartsDao_F";
import CartsDao_M from "./cartsDao_M";
import ProductsDao_F from "./productsDao_F";
import ProductsDao_M from "./productsDao_M";


let cartsDao:CartsDao_M | CartsDao_F;
let productsDao:ProductsDao_M | ProductsDao_F;

switch (process.env.DB) {
    case 'mongodb':
        cartsDao = new CartsDao_M
        productsDao = new ProductsDao_M
        break;
    case 'firebase':
        cartsDao = new CartsDao_F
        productsDao = new ProductsDao_F
        break
    default:
        cartsDao = new CartsDao_M
        productsDao = new ProductsDao_M
        break;
}


export {cartsDao, productsDao};