import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'GET':
        try {
            const snapshots = await db.collection('templates').get();
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
