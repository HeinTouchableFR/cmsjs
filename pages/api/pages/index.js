import db from 'utils/dbConnect';

export default async (req, res) => {
    const {method} = req;

    const recursive = async function (doc) {
        const fetchPromises = [];
        const item = doc.data();
        item._id = doc.id;
        item.childPagesData = [];
        if (item.childPages) {
            item.childPages.map((page) => {
                const nextPromise = db.doc(`pages/${page}`).get();
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
        item.childPagesData = childSnapshots.map((item) => {
            return item;
        });
        return item;
    };

    switch (method) {
        case 'GET':
            try {
                db.collection('pages')
                    .where('parentPage', '==', null)
                    .get()
                    .then((snapshot) => {
                        const items = snapshot.docs.map(async (doc) => {
                            return await recursive(doc);
                        });
                        Promise.all(items).then((data) => res.status(200).json({success: true, data: data}));
                    });
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        case 'POST':
            try {
                let item = {
                    title: req.body.title,
                    slug: req.body.slug,
                    content: req.body.content,
                    published: req.body.published,
                    author: req.body.author,
                    parentPage: req.body.parentPage,
                    childPages: []
                };
                const data = await db.collection('pages').add(item);
                if (data.id && item.parentPage) {
                    const snapshot = await db.doc(`pages/${item.parentPage}`).get();
                    const page = {
                        id: snapshot.id,
                        ...snapshot.data(),
                    };
                    console.log(page)
                    page.childPages.push(data.id);
                    await db.doc(`pages/${page.id}`).set(page, {merge: true});
                }

                res.status(200).json({
                    success: true, data: {
                        _id: data.id
                    }
                });
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"});
            break;
    }
};
