import {db} from 'utils/dbConnect';

export default async (req, res) => {
    const { method } = req;

    const recursive = async function (doc) {
        const fetchPromises = [];
        const item = doc.data();
        item._id = doc.id;
        item.childCategoriesData = [];
        if (item.childCategories) {
            item.childCategories.map((categorie) => {
                const nextPromise = db.doc(`categories/${categorie}`).get();
                fetchPromises.push(nextPromise);
            });
        }
        const snapshots = await Promise.all(fetchPromises);
        const fetchPromisesChild = [];
        snapshots.map(async (snapshot) => {
            const nextChildPromise = recursive(snapshot);
            fetchPromisesChild.push(nextChildPromise);
        });
        const childSnapshots = await Promise.all(fetchPromisesChild);
        item.childCategoriesData = childSnapshots.map((item) => {
            return item;
        });
        return item;
    };

    switch (method) {
        case 'GET':
            try {
                const snapshots = await db.collection('categories').where('parentCategory', '==', "").get()
                const items = snapshots.docs.map(async (doc) => {
                    return await recursive(doc);
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
