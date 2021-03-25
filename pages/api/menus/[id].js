import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            const snapshot = await db.doc(`menus/${id}`).get();
            const item = {
                id: snapshot.id,
                ...snapshot.data(),
            };

            if (!item) {
                return res.status(400).json({ success: false });
            }

            res.status(200).json({ success: true, data: item });
            break;
        case 'PUT':
            try {
                const snapshot = await db.doc(`menus/${id}`).get();
                const item = {
                    id: snapshot.id,
                    ...snapshot.data(),
                };
                if (!item) {
                    return res.status(400).json({ success: false, errors: "L'élément n'existe pas." });
                }
                item.name = req.body.name;
                item.items = req.body.items;

                db.doc(`menus/${item.id}`).set(item, { merge: true }).then(res.status(200).json({success: true, data: { id: item.id, ...item },}))
            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        case 'DELETE':
            try {
                db.doc(`menus/${id}`).delete().then(() => res.status(200).json({ success: true }))
            } catch (e) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
