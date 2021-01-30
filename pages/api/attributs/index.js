import dbConnect from "../../../utils/dbConnect";
import Attribut from "../../../models/Attribut";
import Valeur from "../../../models/Valeur";

dbConnect()

export default async (req, res) => {
    const {method} = req

    switch (method) {
        case 'GET':
            try {
                const items = await Attribut.find({})
                res.status(200).json({success: true, data: items})
            } catch (e) {
                res.status(400).json({success: false})
            }
            break;
        case 'POST':
            try {
                let item = new Attribut({
                    nom: req.body.nom,
                    filtre: req.body.filtre,
                    valeurs: []
                });

                if (req.body.valeurs) {
                    req.body.valeurs.forEach(function (element) {
                        const e = new Valeur({
                            nom: element.nom,
                            attribut: item._id
                        })
                        e.save()
                        item.valeurs.push(e)
                    })
                }
                item.save(item)
                    .then(data => res.status(200).json({success: true, data: data}))
                    .catch(err => res.status(400).json({success: false, errors: err}));
            } catch (e) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"})
            break;
    }
}
