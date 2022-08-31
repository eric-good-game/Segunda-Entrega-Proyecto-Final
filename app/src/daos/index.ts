import CartsDao_F from "./cartsDao_F";
import CartsDao_M from "./cartsDao_M";
import ProductsDao_F from "./productsDao_F";
import ProductsDao_M from "./productsDao_M";
import ProductsDao_FS from "./productsDao_FS";
import ProductsDao_MM from "./productsDao_MM";
import CartsDao_FS from "./cartsDao_FS";
import CartsDao_MM from "./cartsDao_MM";

let cartsDao: CartsDao_M | CartsDao_F | CartsDao_FS | CartsDao_MM;
let productsDao: ProductsDao_M | ProductsDao_F | ProductsDao_FS | ProductsDao_MM;

switch (process.env.DB) {
    case 'mongodb':
        cartsDao = new CartsDao_M
        productsDao = new ProductsDao_M
        break;
    case 'firebase':
        cartsDao = new CartsDao_F
        productsDao = new ProductsDao_F
        break
    case 'filesystem':
        cartsDao = new CartsDao_FS
        productsDao = new ProductsDao_FS
        break
    case 'memory':
        cartsDao = new CartsDao_MM
        productsDao = new ProductsDao_MM
        break
    default:
        cartsDao = new CartsDao_M
        productsDao = new ProductsDao_M
        break;
}


export {cartsDao, productsDao};