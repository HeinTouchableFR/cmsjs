import { db } from 'utils/dbConnect';
import { withAuthAdmin } from 'lib/middlewares';

const handler = async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            const snapshot = await db.doc(`settings/${id}`).get();
            const item = {
                id: snapshot.id,
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

            res.status(200).json({
                success: true,
                data: item,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                errors: e,
            });
        }
        break;
    case 'PUT':
        try {
            const snapshot = await db.doc(`pages/${id}`).get();
            const item = {
                id: snapshot.id,
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
            item.title = req.body.title;
            item.slug = req.body.slug;
            item.updated = req.body.updated;
            item.content = req.body.content;
            item.params = req.body.params;

            await db.doc(`pages/${id}`).set(item, {
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
            await db.doc(`pages/${id}`).delete();
            res.status(200).json({
                success: true,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                errors: e,
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

export default withAuthAdmin(handler);
