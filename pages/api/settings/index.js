import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                db.collection('settings')
                    .get()
                    .then((snapshots) => {
                        const items = snapshots.docs.map(async (item) => {
                            const element = {
                                _id: item.id,
                                ...item.data(),
                            };
                            return element;
                        });
                        Promise.all(items).then((data) => res.status(200).json({ success: true, data: data }));
                    });
            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        default:
            res.status(400).json({ success: false, errors: "Cette méthode n'est pas disponible" });
            break;
    }
};
