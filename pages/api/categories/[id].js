import {db} from "../../../utils/dbConnect";

export default async (req, res) => {
    const {
        query: {id},
        method,
    } = req;

    const recursiveDelete = async function (doc) {
        const fetchPromises = []
        const item = {
            id: doc.id,
            ...doc.data()
        }
        if (item.categoriesEnfant) {
            item.categoriesEnfant.map(categorie => {
                const nextPromise = db.doc(`categories/${categorie}`).get()
                fetchPromises.push(nextPromise)
            })
            const snapshots = await Promise.all(fetchPromises)
            const fetchPromisesChild = []
            snapshots.map(async (snapshot) => {
                const nextChildPromise = recursiveDelete(snapshot)
                fetchPromisesChild.push(nextChildPromise)
            })
            if(fetchPromisesChild.length > 0){
                const childSnapshots = await Promise.all(fetchPromisesChild)
            }
        }

        if(item.categorieParent){
            const ref = db.doc(`categories/${item.categorieParent}`)
            const snapshot = await ref.get()
            const parent = {
                id: snapshot.id,
                ...snapshot.data()
            }
            var index = parent.categoriesEnfant.indexOf(item.id.toString());
            if (index > -1) {
                parent.categoriesEnfant.splice(index, 1);
                const nextPromise = await ref.set(parent, {merge: true})
                await Promise.resolve(nextPromise)
            }

        }
        return await db.doc(`categories/${doc.id}`).delete()
    }

    switch (method) {
        case "GET":
            try {
                const snapshot = await db.doc(`categories/${id}`).get()
                const item = {
                    _id: snapshot.id,
                    ...snapshot.data()
                }

                if (!item) {
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: item});
            } catch (e) {
                res.status(400).json({success: false});
            }
            break;
        case "PUT":
            try {
                const snapshot = await db.doc(`categories/${id}`).get()
                const item = {
                    id: snapshot.id,
                    ...snapshot.data()
                }
                if (!item) {
                    return res
                        .status(400)
                        .json({success: false, errors: "L'élément n'existe pas."});
                }
                item.nom = req.body.nom;
                item.description = req.body.description;
                const promises = []

                if (!(req.body.categorieParent === item.categorieParent) && req.body.categorieParent) {

                    const ref = db.doc(`categories/${req.body.categorieParent}`)
                    const snapshot = await ref.get()
                    const categorie = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                    if (categorie) {
                        categorie.categoriesEnfant.push(item.id);
                        const nextPromise = await ref.set(categorie, {merge: true})
                        promises.push(nextPromise)
                    }
                }
                if (!(req.body.categorieParent === item.categorieParent) && item.categorieParent) {

                    const ref = db.doc(`categories/${item.categorieParent}`)
                    const snapshot = await ref.get()
                    const categorie = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                    var index = categorie.categoriesEnfant.indexOf(item.id.toString());
                    if (index > -1) {
                        categorie.categoriesEnfant.splice(index, 1);
                        const nextPromise = await ref.set(categorie, {merge: true})
                        promises.push(nextPromise)
                    }
                }
                item.categorieParent = req.body.categorieParent ? req.body.categorieParent : "";
                Promise.all(promises).then(db.doc(`categories/${item.id}`).set(item, {merge: true}).then(res.status(200).json({success: true})))
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        case "DELETE":
            try {
                const snapshot = await db.doc(`categories/${id}`).get()
                const item = await recursiveDelete(snapshot)
                res.status(200).json({success: true})
            } catch (e) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
};
