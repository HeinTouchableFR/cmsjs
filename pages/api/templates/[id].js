import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            const snapshot = await db.doc(`templates/${id}`).get();
            const item = {
                id: snapshot.id,
                ...snapshot.data(),
            };

            if (!item) {
                return res.status(400).json({
                    success: false,
                });
            }

            res.status(200).json({
                success: true, data: item,
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
