import dbConnect from "../../../utils/dbConnect";
import Categorie from "../../../models/Categorie";
import Valeur from "../../../models/Valeur";

dbConnect()

export default async (req, res) => {
    const {method} = req

    switch (method) {
        case 'GET':
            try {
                const items = await Categorie.find({})
                res.status(200).json({success: true, data: items})
            } catch (e) {
                res.status(400).json({success: false})
            }
            break;
        case 'POST':
            try {
                let item = new Categorie({
                    nom: req.body.nom,
                    description: req.body.description,
                    categoriesEnfant: [],
                    categorieParent: req.body.categorieParent
                });

                if (req.body.categorieParent) {
                    const c = await Categorie.findById(req.body.categorieParent)

                    c.categoriesEnfant.push(item)
                    c.save()
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
