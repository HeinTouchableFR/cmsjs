import db from "../../../utils/dbConnect";

export default async (req, res) => {
    const {
        query: {id},
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const snapshot = await db.doc(`pages/${id}`).get()
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
                const snapshot = await db.doc(`pages/${id}`).get()
                const item = {
                    id: snapshot.id,
                    ...snapshot.data()
                }
                if (!item) {
                    return res
                        .status(400)
                        .json({success: false, errors: "L'élément n'existe pas."});
                }
                item.title = req.body.title;
                item.slug = req.body.slug;
                item.updated = req.body.updated
                item.content = req.body.content
                const promises = []

                if (!(req.body.parentPage == item.parentPage) && req.body.parentPage) {

                    const ref = db.doc(`pages/${req.body.parentPage}`)
                    const snapshot = await ref.get()
                    const page = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                    if (page) {
                        page.childPages.push(item.id);
                        const nextPromise = await ref.set(page, {merge: true})
                        promises.push(nextPromise)
                    }
                }
                if (!(req.body.parentPage == item.parentPage) && item.parentPage) {

                    const ref = db.doc(`pages/${item.parentPage}`)
                    const snapshot = await ref.get()
                    const page = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }
                    var index = page.childPages.indexOf(item.id.toString());
                    if (index > -1) {
                        page.childPages.splice(index, 1);
                        const nextPromise = await ref.set(page, {merge: true})
                        promises.push(nextPromise)
                    }
                }
                console.log(req.body.parentPage)
                item.parentPage = req.body.parentPage === undefined ? null : req.body.parentPage;
                Promise.all(promises).then(db.doc(`pages/${item.id}`).set(item, {merge: true}).then(res.status(200).json({
                    success: true,
                    data: {_id: item.id, ...item}
                })))
            } catch (e) {
                res.status(400).json({success: false, errors: e});
            }
            break;
        case "DELETE":
            try {
                db.doc(`pages/${id}`).delete().then(res.status(200).json({success: true}))
            } catch (e) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
};
