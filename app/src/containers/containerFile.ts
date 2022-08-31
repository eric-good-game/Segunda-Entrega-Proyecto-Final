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


class ContainerFile {
    fileName: string;
    filePath: string;
    next_id:number = 1;
    constructor(fileName:string) {
        this.fileName = fileName;
        this.filePath = `./app/src/data/${fileName}.json`;

    }
    async getItems(){
        try {
            const json = await fs.readFile(this.filePath, "utf8");
            if(!json){
                return [];
            }
            const data = JSON.parse(json);
            this.next_id = data.next_id?parseInt(data.next_id):1;
            return data.items;
        } catch (err) {
            console.log(err);
            return []
        }
    }
    async writeFile(items:Array<Product | Cart>,incrementId:boolean=false) {
        try {
            if(incrementId){
                this.next_id++;
            }
            await fs.writeFile(this.filePath, JSON.stringify({next_id:this.next_id.toString(),items},null,2));
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
            items.push({id:this.next_id.toString(),...item});
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

export default ContainerFile;