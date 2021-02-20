import db from "../../../utils/dbConnect";
import Attribut from "../../../models/Attribut";
import Valeur from "../../../models/Valeur";


export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case "GET":
            try {
                db.collection('attributs').get().then(snapshots => {
                    const items = snapshots.docs.map(async item => {
                        const element = {
                                _id: item.id,
                                ...item.data(),
                            }

                        let valeurs = []
                        const snapshots = db.doc(`attributs/${item.id}`).collection('valeurs').get()
                        snapshots.then(items => {
                            valeurs = items.docs.map(data => {
                                return {
                                    _id: data.id,
                                    ...data.data()
                                }
                            })
                        })
                        await Promise.all(valeurs)

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
                let item = new Attribut({
                    nom: req.body.nom,
                    filtre: req.body.filtre,
                    valeurs: [],
                });

                if (req.body.valeurs) {
                    req.body.valeurs.forEach(function (element) {
                        const e = new Valeur({
                            nom: element.nom,
                            attribut: item._id,
                        });
                        e.save();
                        item.valeurs.push(e);
                    });
                }
                item
                    .save(item)
                    .then((data) => res.status(200).json({success: true, data: data}))
                    .catch((err) =>
                        res.status(400).json({success: false, errors: err})
                    );
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
