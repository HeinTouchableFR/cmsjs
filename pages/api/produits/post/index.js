import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';

import Produit from "../../../../models/Produit";
import Image from "../../../../models/Image";
import Categorie from "../../../../models/Categorie";
const sharp = require("sharp");
import fs from "fs";
import Attribut from "../../../../models/Attribut";


const oneMegabyteInBytes = 1000000;

const upload = multer({
    limits: {fileSize: oneMegabyteInBytes * 2}
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

    item.save(item)
        .then(async data =>  {
            if(typeof req.files["imageEnAvant"] !== typeof undefined){
                for (const img of req.files["imageEnAvant"]) {
                    const resize = await sharp(img.buffer).resize(640, 640)
                        .jpeg()
                        .toBuffer()
                    const base64data = new Buffer(resize, 'binary').toString('base64');
                    const image = new Image({
                        base: base64data
                    })
                    await image.save().then(item.imageEnAvant = image._id)

                }
            }

            if(typeof req.files["galerieImage"] !== typeof undefined){
                for (const img of req.files["galerieImage"]) {
                    const resize = await sharp(img.buffer).resize(640, 640)
                        .jpeg()
                        .toBuffer()
                    const base64data = new Buffer(resize, 'binary').toString('base64');
                    const image = new Image({
                        base: base64data
                    })
                    image.save().then(item.galerieImage.push(image._id))

                }
            }

            if (item.categories.length > 0) {
                for (const element of item.categories) {
                    const c = await Categorie.findById(element)

                    c.produits.push(item._id)
                    c.save()
                }
            }
            item.save().then(data => res.status(200).json({success: true, data: data}))
        })
        .catch(err => res.status(400).json({success: false, errors: err}));
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
