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
        if (item.childCategories) {
            item.childCategories.map(categorie => {
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

        if(item.parentCategory){
            const ref = db.doc(`categories/${item.parentCategory}`)
            const snapshot = await ref.get()
            const parent = {
                id: snapshot.id,
                ...snapshot.data()
            }
            var index = parent.childCategories.indexOf(item.id.toString());
            if (index > -1) {
                parent.childCategories.splice(index, 1);
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
                        .json({success: false, errors: "The item does not exist."});
                }
                item.name = req.body.name;
                item.description = req.body.description;
                const promises = []

                if (!(req.body.parentCategory === item.parentCategory) && req.body.parentCategory) {

                    const ref = db.doc(`categories/${req.body.parentCategory}`)
                    const snapshot = await ref.get()
                    const category = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                    if (category) {
                        category.childCategories.push(item.id);
                        const nextPromise = await ref.set(category, {merge: true})
                        promises.push(nextPromise)
                    }
                }
                if (!(req.body.parentCategory === item.parentCategory) && item.parentCategory) {

                    const ref = db.doc(`categories/${item.parentCategory}`)
                    const snapshot = await ref.get()
                    const category = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                    var index = category.childCategories.indexOf(item.id.toString());
                    if (index > -1) {
                        category.childCategories.splice(index, 1);
                        const nextPromise = await ref.set(category, {merge: true})
                        promises.push(nextPromise)
                    }
                }
                item.parentCategory = req.body.parentCategory ? req.body.parentCategory : "";
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
