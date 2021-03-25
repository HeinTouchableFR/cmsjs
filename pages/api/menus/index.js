import {db} from 'utils/dbConnect';

export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case 'GET':
            try {
                const snapshots = await db.collection('menus').get()
                const items = snapshots.docs.map(async (doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                const data = await Promise.all(items)
                res.status(200).json({success: true, data: data})
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        case 'POST':
            try {
                let item = {
                    name: req.body.name,
                    items: req.body.items,
                };
                const data = await db.collection('menus').add(item);
                res.status(200).json({
                    success: true, data: {
                        id: data.id
                    }
                });
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"});
            break;
    }
};
