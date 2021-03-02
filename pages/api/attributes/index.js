import {db} from "../../../utils/dbConnect";


export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case "GET":
            try {
                db.collection('attributes').get().then(snapshots => {
                    const items = snapshots.docs.map(async item => {
                        const element = {
                            _id: item.id,
                            ...item.data(),
                        }

                        let values = []
                        const snapshots = db.doc(`attributes/${item.id}`).collection('values').get()
                        await snapshots.then(items => {
                            values = items.docs.map(data => {
                                return {
                                    _id: data.id,
                                    ...data.data()
                                }
                            })
                        })
                        await Promise.all(values).then(data => element.values = data)
                        return element
                    })
                    Promise.all(items).then(data => res.status(200).json({success: true, data: data}))
                })
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        case "POST":
            try {
                let item = {
                    name: req.body.name,
                    filters: req.body.filter,
                }
                const data = await db.collection('attributes').add(item);
                if (data.id && req.body.values) {
                    for (const element of req.body.values) {
                        const value = {
                            name: element.name,
                        }
                        await db.doc(`attributes/${data.id}`).collection('values').add(value)
                    }
                }
                res.status(200).json({success: true})
            } catch (e) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res
                .status(400)
                .json({success: false, errors: "Cette méthode n'est pas disponible"});
            break;
    }
};
