import dbConnect from "../../../utils/dbConnect";
import Attribut from "../../../models/Attribut";
import Valeur from "../../../models/Valeur";
import Produit from "../../../models/Produit";
import Categorie from "../../../models/Categorie";

dbConnect()

export default async (req, res) => {
    const {method} = req

    switch (method) {
        case 'GET':
            try {
                const items = await Produit.find({}).populate('imageEnAvant')
                res.status(200).json({success: true, data: items})
            } catch (e) {
                res.status(400).json({success: false, erreurs: e})
            }
            break;
        //case 'POST':
            /*try {
                const form = formidable({ multiples: true });

                let item = new Produit({
                    nom: body.nom,
                    description: body.description,
                    prix: body.prix,
                    prixPromo: body.prixPromo,
                    enVente: body.enVente,
                    largeur: body.largeur,
                    longueur: body.longueur,
                    hauteur: body.hauteur,
                    poids: body.poids,
                    categories: body.categories,
                });

                if(body.categories.length > 0){
                    for(const element of body.categories){
                        const c = await Categorie.findById(element)

                        c.produits.push(item._id)
                        c.save()
                    }
                }

               item.save(item)
                    .then(data => res.status(200).json({success: true, data: data}))
                    .catch(err => res.status(400).json({success: false, errors: err}));
            } catch (e) {
                res.status(400).json({success: false, erreurs: e})
            }*/
            //break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"})
            break;
    }
}
