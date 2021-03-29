import {db} from 'utils/dbConnect';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const snapshots = await db.collection('templates').get()
                const items = snapshots.docs.map(async (doc) => {
                    return {
                        _id: doc.id,
                        ...doc.data()
                    };
                });
                const data = await Promise.all(items)
                res.status(200).json({ success: true, data: data })
            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        case 'POST':
            let item = {
                name: req.body.name,
                description: req.body.description,
                childCategories: [],
                parentCategory: req.body.parentCategory ? req.body.parentCategory : "",
                products: []
            };
            const data = await db.collection('categories').add(item);
            if (data.id && item.parentCategory) {
                const snapshot = await db.doc(`categories/${item.parentCategory}`).get();
                const category = {
                    id: snapshot.id,
                    ...snapshot.data(),
                };
                category.childCategories.push(data.id);
                await db.doc(`categories/${category.id}`).set(category, { merge: true });
            }

            res.status(200).json({ success: true });
            break;
        default:
            res.status(400).json({ success: false, errors: "Cette méthode n'est pas disponible" });
            break;
    }
};
