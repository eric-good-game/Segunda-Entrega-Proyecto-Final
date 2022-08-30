import ContainerMonogoDb from "../containers/containerMongoDb";
import Cart from "../models/carts";

class CartsDao_M extends ContainerMonogoDb {
    constructor(){
        super(Cart);
    }
}

export default CartsDao_M