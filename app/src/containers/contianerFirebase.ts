    import admin from 'firebase-admin'

    const db = admin.firestore();

    class ContainerFirebase {
        query:admin.firestore.CollectionReference
        constructor(collection:string){
            this.query = db.collection(collection);
        }

        async create(data:any){
            const doc = this.query.doc();
            const product = await doc.create(data);
            return product;
        }
        async getAll(){
            const snapshot = await this.query.get();
            return snapshot.docs.map(doc => doc.data());
        }

        async getById(id:string){
            const doc = await this.query.doc(id).get();
            return doc.data();
        }
        async update(id:string, data:any){
            try {
                const doc = await this.query.doc(id).update(data);
                return doc;
            } catch (err) {
                console.log(err);
            }
        }
        async delete(id:string){
            const doc = await this.query.doc(id).delete();
            return doc;
        }
    }

    export default ContainerFirebase