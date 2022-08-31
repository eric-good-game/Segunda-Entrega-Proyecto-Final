import fs from 'fs/promises'

interface base {
    id?: string;
}

interface Product extends base {
    name:string,
    price:number,
    image:string
    stock:number
}
interface Cart extends base {
    products:Product[],
    user_id:string,
    quantity:number
    totoal:number
}
interface Data {
    next_id:string,
    items:Array<Product | Cart>
}

class ContainerMemory {
    data:Data = {
        next_id:'1',
        items:[]
    };
    async getItems(){
        try {
            return this.data.items;
        } catch (err) {
            console.log(err);
            return []
        }
    }
    async writeFile(items:Array<Product | Cart>,incrementId:boolean=false) {
        try {
            if(incrementId){
                this.data.next_id = (parseInt(this.data.next_id) + 1).toString();
            }
            this.data.items = items;
        } catch (err) {
            console.log(err);
        }
    }
    async getAll() {
        try {
            const items = await this.getItems();
            return items
        } catch (err) {
            console.log(err);
        }
    }
    async getById(id:string) {
        try {
            const items:Array<Product | Cart> = await this.getItems();
            return items.find((item:Product|Cart) => item.id === id);
        } catch (err) {
            console.log(err);
        }
    }
    async create(item:Product|Cart) {
        try {
            const items:Array<Product | Cart> = await this.getItems();
            items.push({id:this.data.next_id,...item});
            await this.writeFile(items, true);
            return "Item created";
        } catch (err) {
            console.log(err);
        }
    }
    async update(id:string,data:Partial<Product|Cart>) {
        try {
            let edit=false;
            const items:Array<Product | Cart> = (await this.getItems()).map((item:Product|Cart) => {                
                if (item.id === id) {
                    edit=true;
                    return {...item, ...data}
                }
                return item;
            });
            
            if(!edit){
                return null
            }
            await this.writeFile(items);
            return "Item updated";
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id:string) {
        try {
            let deleted = false;
            const items:Array<Product | Cart> = (await this.getItems()).filter((item:Product|Cart) => {
                if(item.id === id){
                    deleted = true;
                    return false;
                }
                return true
            });
            if(!deleted){
                return 'Item not found'
            }
            await this.writeFile(items);
            return "Item deleted";
        } catch (err) {
            console.log(err);
        }
    }
}

export default ContainerMemory;