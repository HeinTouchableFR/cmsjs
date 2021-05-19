import { db } from 'utils/dbConnect';

const handler = async (req, res) => {
    const { query: { slug },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            const snapshot = await db.collection('pages').where('slug', '==', slug).get();
            console.log(snapshot.docs)
            const item = {
                id: snapshot.docs[0].id,
                ...snapshot.docs[0].data(),
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
                success: false, errors: e,
            });
        }
    default:
        return res.status(400).json({
            success: false,
        });
    }
};

export default handler;
