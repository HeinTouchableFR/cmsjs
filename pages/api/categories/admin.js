import db from "../../../utils/dbConnect";

export default async (req, res) => {
    const {method} = req;

    const recursive = async function (doc) {
        const fetchPromises = []
        const item = doc.data()
        item._id = doc.id
        item.categoriesEnfantData = []
        if (item.categoriesEnfant) {
            item.categoriesEnfant.map(categorie => {
                const nextPromise = db.doc(`categories/${categorie}`).get()
                fetchPromises.push(nextPromise)
            })
        }
        const snapshots = await Promise.all(fetchPromises)
        const fetchPromisesChild = []
        snapshots.map(async (snapshot) => {
            const nextChildPromise = recursive(snapshot)
            fetchPromisesChild.push(nextChildPromise)
        })
        const childSnapshots = await Promise.all(fetchPromisesChild)
        item.categoriesEnfantData = childSnapshots.map(item => {
            return item
        })
        return item
    }

    switch (method) {
        case "GET":
            try {

                db.collection('categories').where('categorieParent', "==", null).get().then(snapshot => {
                    const items = snapshot.docs.map(async doc => {
                        return await recursive(doc)
                    })
                    Promise.all(items).then(data => res.status(200).json({success: true, data: data}))
                })

            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
};
