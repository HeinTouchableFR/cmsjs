import db from "../../../utils/dbConnect";

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                db.collection('images')
                    .orderBy('created_at', 'desc')
                    .get()
                    .then((snapshot) => {
                        const items = snapshot.docs.map((doc) => {
                            return {
                                _id: doc.id,
                                ...doc.data()
                            }
                        });
                        Promise.all(items).then((data) => res.status(200).json({ success: true, data: data }));
                    });
            } catch (e) {
                res.status(400).json({ success: false, erreurs: e });
            }
            break;
        default:
            res
                .status(400)
                .json({ success: false, errors: "Cette méthode n'est pas disponible" });
            break;
    }
};
