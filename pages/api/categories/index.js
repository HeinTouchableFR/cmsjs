import db from 'utils/dbConnect';

export default async (req, res) => {
    const { method } = req;

    const recursive = async function (doc) {
        const fetchPromises = [];
        const item = doc.data();
        item._id = doc.id;
        item.categoriesEnfantData = [];
        if (item.categoriesEnfant) {
            item.categoriesEnfant.map((categorie) => {
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
        item.categoriesEnfantData = childSnapshots.map((item) => {
            return item;
        });
        return item;
    };

    switch (method) {
        case 'GET':
            try {
                db.collection('categories')
                    .where('categorieParent', '==', null)
                    .get()
                    .then((snapshot) => {
                        const items = snapshot.docs.map(async (doc) => {
                            return await recursive(doc);
                        });
                        Promise.all(items).then((data) => res.status(200).json({ success: true, data: data }));
                    });
            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        case 'POST':
            let item = {
                nom: req.body.nom,
                description: req.body.description,
                categoriesEnfant: [],
                categorieParent: req.body.categorieParent,
            };
            const data = await db.collection('categories').add(item);
            if (data.id && item.categorieParent) {
                const snapshot = await db.doc(`categories/${item.categorieParent}`).get();
                const categorie = {
                    id: snapshot.id,
                    ...snapshot.data(),
                };
                categorie.categoriesEnfant.push(data.id);
                await db.doc(`categories/${categorie.id}`).set(categorie, { merge: true });
            }

            res.status(200).json({ success: true });
            break;
        default:
            res.status(400).json({ success: false, errors: "Cette méthode n'est pas disponible" });
            break;
    }
};
