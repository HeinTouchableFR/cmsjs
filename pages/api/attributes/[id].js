import { db } from 'utils/dbConnect';

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const snapshot = await db.doc(`attributes/${id}`).get();
                const item = {
                    _id: snapshot.id,
                    ...snapshot.data(),
                };

                if (!item) {
                    return res.status(400).json({ success: false });
                }

                let values = [];
                const snapshots = db.doc(`attributes/${item._id}`).collection('values').get();
                await snapshots.then((items) => {
                    values = items.docs.map((data) => {
                        return {
                            _id: data.id,
                            ...data.data(),
                        };
                    });
                });
                await Promise.all(values).then((data) => {
                    item.values = data;
                });
                res.status(200).json({ success: true, data: item });
            } catch (e) {
                console.log(e);
                res.status(400).json({ success: false, erreurs: e });
            }
            break;
        case 'PUT':
            try {
                const snapshot = await db.doc(`attributes/${id}`).get();
                const item = {
                    id: snapshot.id,
                    ...snapshot.data(),
                };

                if (!item) {
                    return res.status(400).json({ success: false, errors: 'The item does not exist.' });
                }
                item.name = req.body.name;
                item.filter = req.body.filter;

                if (req.body.values) {
                    for (const element of req.body.values) {
                        const value = {
                            name: element.name,
                        };
                        await db.doc(`attributes/${item.id}`).collection('values').doc(`${element._id}`).set(value, { merge: true });
                    }
                }
                if (req.body.newValues.length > 0) {
                    for (const element of req.body.newValues) {
                        const value = {
                            name: element.name,
                        };
                        await db.doc(`attributes/${item.id}`).collection('values').add(value);
                    }
                }
                if (req.body.deleteValues.length > 0) {
                    for (const element of req.body.deleteValues) {
                        await db.doc(`attributes/${item.id}`).collection('values').doc(`${element._id}`).delete();
                    }
                }
                await db.doc(`attributes/${item.id}`).set(item, { merge: true });
                res.status(200).json({ success: true });
            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        case 'DELETE':
            try {
                await db.doc(`attributes/${id}`).delete();

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
