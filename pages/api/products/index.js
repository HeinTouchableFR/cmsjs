import {db} from 'utils/dbConnect';


export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case 'GET':
            try {
                const snapshots = await db.collection('products').get()
                const items = snapshots.docs.map(async (doc) => {
                    return {
                        _id: doc.id,
                        ...doc.data()
                    }
                });
                const data = await Promise.all(items)
                res.status(200).json({success: true, data: data})
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        case 'POST':
            try {
                let item = {
                    name: req.body.name,
                    description: req.body.description,
                    onSale: req.body.onSale,
                    price: req.body.price,
                    specialPrice: req.body.specialPrice,
                    width: req.body.width,
                    length: req.body.length,
                    height: req.body.height,
                    weight: req.body.weight,
                    categories: req.body.categories,
                    productImage: req.body.productImage,
                    productGallery: req.body.productGallery,
                    attributes: req.body.attributes,
                    created_at: new Date()
                }
                const data = await db.collection('products').add(item);

                if (item.productImage && data.id) {
                    const ref = db.doc(`images/${item.productImage._id}`)
                    const snapshot = await ref.get()
                    const image = {
                        id: snapshot.id,
                        ...snapshot.data(),
                    };
                    image.products.push(data.id)
                    await ref.set(image, {merge: true})
                }
                if (item.productGallery.length > 0 && data.id) {
                    for (const element of item.productGallery) {
                        const ref = db.doc(`images/${element._id}`)
                        const snapshot = await ref.get()
                        const image = {
                            id: snapshot.id,
                            ...snapshot.data(),
                        };
                        image.products.push(data.id)
                        await ref.set(image, {merge: true})
                    }
                }
                if (item.categories.length > 0 && data.id) {
                    for (const element of item.categories) {
                        const ref = db.doc(`categories/${element}`)
                        const snapshot = await ref.get()
                        const category = {
                            id: snapshot.id,
                            ...snapshot.data(),
                        };
                        category.products.push(data.id)
                        await ref.set(category, {merge: true})
                    }
                }
                if(item.attributes.length > 0 && data.id){
                    for(const element of item.attributes){
                        const ref = db.doc(`attributes/${element.attribute}`)
                        const snapshot = await ref.get()
                        const attribute = {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                        attribute.products.push(data.id)
                        await ref.set(attribute, {merge: true})
                        for(const value of element.values){
                            const valueRef = ref.collection('values').doc(value)
                            const snapshot = await valueRef.get()
                            const v = {
                                id: snapshot.id,
                                ...snapshot.data()
                            }
                            v.products.push(data.id)
                            await valueRef.set(v, {merge: true})
                        }
                    }
                }
                res.status(200).json({success: true})
            } catch (e) {
                res.status(400).json({success: false, errors: e})
            }
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"});
            break;
    }
};
