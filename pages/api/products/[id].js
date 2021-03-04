import {db} from 'utils/dbConnect';

export default async (req, res) => {
    const {
        query: {id},
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const snapshot = await db.doc(`products/${id}`).get();
                const item = {
                    _id: snapshot.id,
                    ...snapshot.data(),
                };

                if (!item) {
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: item});
            } catch (e) {
                console.log(e);
                res.status(400).json({success: false, erreurs: e});
            }
            break;
        case 'PUT':
            try {
                const productRef = db.doc(`products/${id}`)
                const snapshot = await productRef.get();
                const item = {
                    id: snapshot.id,
                    ...snapshot.data(),
                    updated_at: new Date()
                };
                if (!item) {
                    return res.status(400).json({success: false, errors: 'The item does not exist.'});
                }
                item.name = req.body.name
                item.description = req.body.description
                item.onSale = req.body.onSale
                item.price = req.body.price
                item.specialPrice = req.body.specialPrice
                item.width = req.body.width
                item.length = req.body.length
                item.height = req.body.weight
                item.weight = req.body.height

                if (item.categories) {
                    //New categories
                    for (const element of req.body.categories) {
                        if (!item.categories.includes(element)) {
                            const ref = db.doc(`categories/${element}`)
                            const snapshot = await ref.get()
                            const category = {
                                id: snapshot.id,
                                ...snapshot.data(),
                            };
                            category.products.push(id)
                            await ref.set(category, {merge: true})
                        }
                    }
                    //Categories to delete
                    for (const element of item.categories) {
                        if (!req.body.categories.includes(element)) {
                            const ref = db.doc(`categories/${element}`)
                            const snapshot = await ref.get()
                            const category = {
                                id: snapshot.id,
                                ...snapshot.data()
                            }
                            const index = category.products.indexOf(id);
                            if (index > -1) {
                                category.products.splice(index, 1);
                                await ref.set(category, {merge: true});
                            }
                        }
                    }
                }
                item.categories = req.body.categories

                if (item.productImage) {
                    if (item.productImage._id !== req.body.productImage._id) {
                        //Edit the new image
                        const ref = db.doc(`images/${req.body.productImage._id}`)
                        const snapshot = await ref.get()
                        const image = {
                            id: snapshot.id,
                            ...snapshot.data(),
                        };
                        image.products.push(id)
                        await ref.set(image, {merge: true})
                        //Remove ref of product from old image
                        const imageRefOld = db.doc(`images/${item.productImage._id}`)
                        const snapshotOld = await imageRefOld.get()
                        const imageOld = {
                            id: snapshotOld.id,
                            ...snapshotOld.data()
                        }
                        const index = imageOld.products.indexOf(id);
                        if (index > -1) {
                            imageOld.products.splice(index, 1);
                            await imageRefOld.set(imageOld, {merge: true});
                        }
                    }
                }
                item.productImage = req.body.productImage

                if (item.productGallery) {
                    for (const element of req.body.productGallery) {
                        if (!item.productGallery.includes(element)) {
                            const ref = db.doc(`images/${element._id}`)
                            const snapshot = await ref.get()
                            const image = {
                                id: snapshot.id,
                                ...snapshot.data(),
                            };
                            image.products.push(id)
                            await ref.set(image, {merge: true})
                        }
                    }
                    for (const element of item.productGallery) {
                        if (!req.body.productGallery.includes(element)) {
                            const ref = db.doc(`images/${element._id}`)
                            const snapshot = await ref.get()
                            const image = {
                                id: snapshot.id,
                                ...snapshot.data()
                            }
                            const index = image.products.indexOf(id);
                            if (index > -1) {
                                image.products.splice(index, 1);
                                await ref.set(image, {merge: true});
                            }
                        }
                    }
                }
                item.productGallery = req.body.productGallery

                if (item.attributes) {
                    //New attributes
                    for (const element of req.body.attributes) {
                        const isNew = !item.attributes.some(item => item.attribute === element.attribute)
                        if (isNew) {
                            const ref = db.doc(`attributes/${element.attribute}`)
                            const snapshot = await ref.get()
                            const attribute = {
                                id: snapshot.id,
                                ...snapshot.data()
                            }
                            attribute.products.push(id)
                            await ref.set(attribute, {merge: true})
                            for(const value of element.values){
                                const valueRef = ref.collection('values').doc(value)
                                const snapshot = await valueRef.get()
                                const v = {
                                    id: snapshot.id,
                                    ...snapshot.data()
                                }
                                v.products.push(id)
                                await valueRef.set(v, {merge: true})
                            }
                        }
                    }
                    //attributes to edit, add values
                    for (const element of req.body.attributes){
                        const isEdit = item.attributes.some(item => item.attribute === element.attribute)
                        const attribute = item.attributes.find((a) => {
                            return a.attribute === element.attribute;
                        });
                        if (isEdit) {
                            for(const value of element.values){
                                const isNew = !attribute.values.some(item => item === value)
                                if(isNew){
                                    const valueRef = db.doc(`attributes/${attribute.attribute}`).collection('values').doc(value)
                                    const snapshot = await valueRef.get()
                                    const v = {
                                        id: snapshot.id,
                                        ...snapshot.data()
                                    }
                                    v.products.push(id)
                                    await valueRef.set(v, {merge: true})
                                }
                            }
                        }
                    }
                    //attributes to edit, delete values
                    for (const element of item.attributes){
                        const isEdit = item.attributes.some(item => item.attribute === element.attribute)
                        const attribute = req.body.attributes.find((a) => {
                            return a.attribute === element.attribute;
                        });
                        if (isEdit) {
                            for(const value of element.values){
                                const isDelete = !attribute.values.some(item => item === value)
                                if(isDelete){
                                    const valueRef = db.doc(`attributes/${attribute.attribute}`).collection('values').doc(value)
                                    const snapshot = await valueRef.get()
                                    const v = {
                                        id: snapshot.id,
                                        ...snapshot.data()
                                    }
                                    const index = v.products.indexOf(id);
                                    if (index > -1) {
                                        v.products.splice(index, 1);
                                        await valueRef.set(v, {merge: true});
                                    }
                                }
                            }
                        }
                    }
                    //attributes to delete
                    for (const element of item.attributes) {
                        const isDelete = !req.body.attributes.some(item => item.attribute === element.attribute)
                        if (isDelete) {
                            const attributeRef = db.doc(`attributes/${element.attribute}`)
                            const snapshot = await attributeRef.get()
                            const attribute = {
                                id: snapshot.id,
                                ...snapshot.data()
                            }

                            for (const value of element.values) {
                                const valueRef = attributeRef.collection('values').doc(value)
                                const snapshot = await valueRef.get()
                                const v = {
                                    id: snapshot.id,
                                    ...snapshot.data()
                                }
                                const index = v.products.indexOf(id);
                                if (index > -1) {
                                    v.products.splice(index, 1);
                                    await valueRef.set(v, {merge: true});
                                }
                            }
                            const index = attribute.products.indexOf(id);
                            if (index > -1) {
                                attribute.products.splice(index, 1);
                                await attributeRef.set(attribute, {merge: true});
                            }
                        }
                    }
                }
                item.attributes = req.body.attributes

                await productRef.set(item, {merge: true})
                res.status(200).json({success: true});
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        case 'DELETE':
            try {
                const ref = db.doc(`products/${id}`)
                const snapshot = await ref.get()
                const item = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                if (item.categories) {
                    for (const category of item.categories) {
                        const categoryRef = db.doc(`categories/${category}`)
                        const snapshot = await categoryRef.get()
                        const item = {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                        const index = item.products.indexOf(id);
                        if (index > -1) {
                            item.products.splice(index, 1);
                            await categoryRef.set(item, {merge: true});
                        }
                    }
                }
                if (item.attributes) {
                    for (const attribute of item.attributes) {
                        const attributeRef = db.doc(`attributes/${attribute.attribute}`)
                        const snapshot = await attributeRef.get()
                        const item = {
                            id: snapshot.id,
                            ...snapshot.data()
                        }

                        for (const value of attribute.values) {
                            const valueRef = attributeRef.collection('values').doc(value)
                            const snapshot = await valueRef.get()
                            const item = {
                                id: snapshot.id,
                                ...snapshot.data()
                            }
                            const index = item.products.indexOf(id);
                            if (index > -1) {
                                item.products.splice(index, 1);
                                await valueRef.set(item, {merge: true});
                            }
                        }
                        const index = item.products.indexOf(id);
                        if (index > -1) {
                            item.products.splice(index, 1);
                            await attributeRef.set(item, {merge: true});
                        }
                    }
                }

                if (item.productImage) {
                    const imageRef = db.doc(`images/${item.productImage._id}`)
                    const snapshot = await imageRef.get()
                    const image = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                    const index = image.products.indexOf(id);
                    if (index > -1) {
                        image.products.splice(index, 1);
                        await imageRef.set(image, {merge: true});
                    }
                }
                if (item.productGallery) {
                    for (const image of item.productGallery) {
                        const imageRef = db.doc(`images/${image._id}`)
                        const snapshot = await imageRef.get()
                        const element = {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                        const index = element.products.indexOf(id);
                        if (index > -1) {
                            element.products.splice(index, 1);
                            await imageRef.set(element, {merge: true});
                        }
                    }
                }

                await db.doc(`products/${id}`).delete();

                res.status(200).json({success: true});
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
};
