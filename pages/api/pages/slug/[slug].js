import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const { query: { slug },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            const snapshot = await db.collection('pages').where('slug', '==', slug).get();
            const item = {
                _id: snapshot.docs[0].id,
                ...snapshot.docs[0].data(),
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
                success: false, errors: e,
            });
        }
        break;
    default:
        res.status(400).json({
            success: false,
        });
        break;
    }
};
