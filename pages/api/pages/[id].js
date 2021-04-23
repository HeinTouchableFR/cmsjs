import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            const snapshot = await db.doc(`pages/${id}`).get();
            const item = {
                id: snapshot.id,
                ...snapshot.data(),
            };

            if (!item) {
                return res.status(400).json({
                    success: false,
                });
            }

            return res.status(200).json({
                success: true, data: item,
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
            });
        }
    case 'PUT':
        try {
            const snapshot = await db.doc(`pages/${id}`).get();
            const item = {
                id: snapshot.id,
                ...snapshot.data(),
            };
            if (!item) {
                return res.status(400).json({
                    success: false, errors: "L'élément n'existe pas.",
                });
            }
            item.title = req.body.title;
            item.slug = req.body.slug;
            item.updated = req.body.updated;
            item.content = req.body.content;

            await db.doc(`pages/${id}`).set(item, {
                merge: true,
            });

            return res.status(200).json({
                success: true,
                data: {
                    id: item.id, ...item,
                },
            });
        } catch (e) {
            return res.status(400).json({
                success: false, errors: e,
            });
        }
    case 'DELETE':
        try {
            await db.doc(`pages/${id}`).delete();
            return res.status(200).json({
                success: true,
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
            });
        }
    default:
        return res.status(400).json({
            success: false,
        });
    }
};
