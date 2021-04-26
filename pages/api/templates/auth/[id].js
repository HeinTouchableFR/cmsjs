import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'PUT':
        try {
            const snapshot = await db.doc(`templates/${id}`).get();
            const item = {
                ...snapshot.data(),
            };
            if (!item) {
                res.status(400).json({
                    success: false,
                    errors: {
                        status: 404,
                        code: 1,
                        message: 'Item not found',
                    },
                });
            }
            item.content = req.body.content;
            item.params = req.body.params;

            await db.doc(`templates/${id}`).set(item, {
                merge: true,
            });

            res.status(200).json({
                success: true,
                data: {
                    id: item.id, ...item,
                },
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                errors: e,
            });
        }
        break;
    case 'DELETE':
        try {
            const snapshot = await db.doc(`templates/${id}`).get();
            const item = "";
            res.status(200).json({
                success: true,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
            });
        }
        break;
    default:
        res.status(400).json({
            success: false,
            errors: {
                status: 404,
                code: 1,
                message: 'This method is not available',
            },
        });
        break;
    }
};
