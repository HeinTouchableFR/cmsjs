import {db} from 'utils/dbConnect';

export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const snapshot = await db.doc(`products/${id}`).get();
                const item = {
                    _id: snapshot.id,
                    ...snapshot.data(),
                };

                if (!item) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: item });
            } catch (e) {
                console.log(e);
                res.status(400).json({ success: false, erreurs: e });
            }
            break;
        case 'PUT':
            try {
                const snapshot = await db.doc(`products/${id}`).get();
                const item = {
                    id: snapshot.id,
                    ...snapshot.data(),
                };
                if (!item) {
                    return res.status(400).json({ success: false, errors: 'The item does not exist.' });
                }
            } catch (e) {
                res.status(400).json({ success: false, errors: e });
            }
            break;
        case 'DELETE':
            try {
                const item = await Attribut.findById(id);

                if (item && item.valeurs.length > 0) {
                    for (const element of item.valeurs) {
                        console.log(element);
                        const valeur = await Valeur.deleteOne({ _id: element });
                        console.log(valeur);
                    }
                }
                const deletedItem = await Attribut.deleteOne({ _id: id });

                if (!deletedItem) {
                    return res.status(400).json({ success: false });
                }

                return res.status(200).json({ success: true, data: {} });
            } catch (e) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
