import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const snapshot = await db.doc(`templates/${id}`).get();
                const item = {
                    _id: snapshot.id,
                    ...snapshot.data(),
                };

                if (!item) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: item });
            } catch (e) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const snapshot = await db.doc(`templates/${id}`).get();
                const item = {
                    ...snapshot.data(),
                };
                if (!item) {
                    return res.status(400).json({ success: false, errors: "L'élément n'existe pas." });
                }
                item.content = req.body.content;

                db.doc(`templates/${id}`).set(item, { merge: true }).then(res.status(200).json({success: true, data: { id: item.id, ...item },}))
            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        case 'DELETE':
            try {
                const snapshot = await db.doc(`categories/${id}`).get();
                const item = await recursiveDelete(snapshot);
                res.status(200).json({ success: true });
            } catch (e) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
