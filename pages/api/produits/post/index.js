import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';

import Produit from "../../../../models/Produit";
import Image from "../../../../models/Image";
import Categorie from "../../../../models/Categorie";


const oneMegabyteInBytes = 1000000;

var path = require('path');

const upload = multer({
    limits: {fileSize: oneMegabyteInBytes * 2},
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, 'uploads'),
        filename: (req, file, cb) => cb(null, (Math.random().toString(36) + '00000000000000000').slice(2, 10) + Date.now() + path.extname(file.originalname)),
    }),
    /*fileFilter: (req, file, cb) => {
      const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
      cb(null, acceptFile);
    },*/
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
});

apiRoute.use(upload.fields([{name: 'imageEnAvant'}, {name: "galerieImage"}]));
//apiRoute.use(upload.array('galerieImage'));

apiRoute.post(async (req, res) => {
    let item = new Produit({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        prixPromo: req.body.prixPromo,
        enVente: req.body.produitEnVente,
        largeur: req.body.largeur,
        longueur: req.body.longueur,
        hauteur: req.body.hauteur,
        poids: req.body.poids,
        categories: JSON.parse(req.body.categories),
        galerieImage: []
    });

    for (const img of req.files["imageEnAvant"]) {
        const destination = img.destination.replace('./public', '')
        const image = new Image({
            destination: destination,
            filename: img.filename,
        })
        image.save()
        item.imageEnAvant = image._id
    }

    for (const img of req.files["galerieImage"]) {
        const destination = img.destination.replace('./public', '')
        const image = new Image({
            destination: destination,
            filename: img.filename,
        })
        image.save()
        item.galerieImage.push(image._id)
    }

    if (item.categories.length > 0) {
        for (const element of item.categories) {
            const c = await Categorie.findById(element)

            c.produits.push(item._id)
            c.save()
        }
    }

    item.save(item)
        .then(data => res.status(200).json({success: true, data: data}))
        .catch(err => res.status(400).json({success: false, errors: err}));
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
