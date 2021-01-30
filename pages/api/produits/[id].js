import dbConnect from "../../../utils/dbConnect";
import Produit from "../../../models/Produit";

dbConnect()

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET':
            try {
                const item = await Produit.findById(id).populate('imageEnAvant').populate('galerieImage')
                if(!item){
                    return res.status(400).json({success: false, data:"Produit inconnu"})
                }

                res.status(200).json({success: true, data: item})
            }catch (e) {
                console.log(e)
                res.status(400).json({success: false, erreurs: e})
            }
            break;
        case 'PUT':
            try {
                const item = await Attribut.findById(id)

                if(!item){
                    return res.status(400).json({success: false, errors: "L'élément n'existe pas."})
                }
                item.nom = req.body.nom
                item.filtre = req.body.filtre

                if(req.body.valeurs){
                    for (const element of req.body.valeurs) {
                        const e = await Valeur.findById(element._id)
                        if(e){
                            e.nom = element.nom
                            e.save()
                        }
                    }
                }
                if(req.body.newValeurs.length > 0){
                    req.body.newValeurs.forEach(function (element) {
                        const e = new Valeur({
                            nom: element.nom,
                            attribut: item._id
                        })
                        e.save()
                        item.valeurs.push(e)
                    })
                }
                if(req.body.deleteValeurs.length > 0){
                    for (const element of req.body.deleteValeurs) {
                        const deletedItem = await Valeur.deleteOne({_id: element._id})
                        if(deletedItem){
                            var index = item.valeurs.indexOf(element._id);
                            if (index > -1) {
                                item.valeurs.splice(index, 1);
                            }
                        }
                    }
                }
                item.save(item)
                    .then(data => res.status(200).json({success: true, data: data}))
                    .catch(err => res.status(400).json({success: false, errors: err}));
            }catch (e) {
                res.status(400).json({success: false, errors: e})
            }
            break;
        case 'DELETE':
                try {
                    const item = await Attribut.findById(id)

                    if(item && item.valeurs.length > 0){
                        for(const element of item.valeurs){
                            console.log(element)
                            const valeur = await Valeur.deleteOne({_id: element})
                            console.log(valeur)
                        }
                    }
                    const deletedItem = await Attribut.deleteOne({_id: id})

                    if(!deletedItem){
                        return res.status(400).json({success: false})
                    }

                    return res.status(200).json({success: true, data: {}})
                }catch (e) {
                    res.status(400).json({success: false})
                }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}
