import { firebase } from 'utils/firebaseClient';

const db = firebase.firestore();

export default async (req, res) => {
    const { method } = req;
    switch (method) {
    case 'GET':
        try {
            const snapshots = await db.collection('pages').orderBy('title').get();
            const items = snapshots.docs.map(async (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const data = await Promise.all(items);
            res.status(200).json({
                success: true, data,
            });
        } catch (e) {
            res.status(400).json({
                success: false, errors: e,
            });
        }
        break;
    case 'POST':
        try {
            const item = {
                title: req.body.title,
                slug: req.body.slug,
                content: req.body.content,
                published: req.body.published,
                author: req.body.author,
            };
            const data = await db.collection('pages').add(item);
            res.status(200).json({
                success: true,
                data: {
                    id: data.id,
                },
            });
        } catch (e) {
            res.status(400).json({
                success: false, errors: e,
            });
        }
        break;
    default:
        res.status(400).json({
            success: false, errors: "Cette méthode n'est pas disponible",
        });
        break;
    }
};
