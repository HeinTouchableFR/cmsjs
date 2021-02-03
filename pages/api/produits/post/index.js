import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';

import Produit from "../../../../models/Produit";
import Image from "../../../../models/Image";
import Categorie from "../../../../models/Categorie";
const sharp = require("sharp");
const gcsSharp = require('multer-sharp');
const { Storage } = require('@google-cloud/storage');
var path = require('path');

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket =
    storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);
import fs from "fs";
import Attribut from "../../../../models/Attribut";


const oneMegabyteInBytes = 1000000;


const upload = multer({
    limits: {fileSize: oneMegabyteInBytes * 2},
    storage: multer.memoryStorage(),
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
            if (item.categories.length > 0) {
                for (const element of item.categories) {
                    const c = await Categorie.findById(element)

                    c.produits.push(item._id)
                    c.save()
                }
            }
            if(typeof req.files["galerieImage"] !== typeof undefined){
                for (const img of req.files["galerieImage"]) {
                    const newName = (Math.random().toString(36) + '00000000000000000').slice(2, 10) + Date.now() + path.extname(img.originalname)
                    const blob = bucket.file(newName);
                    const blobWriter = blob.createWriteStream({
                        metadata: {
                            contentType: img.mimetype,
                        },
                    });
                    blobWriter.on('error', (err) => console.log(err));
                    blobWriter.on('finish', async () => {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                            bucket.name
                        }/o/${encodeURI(blob.name)}?alt=media`;
                        const image = new Image({
                            url: publicUrl
                        })
                        await image.save().then(item.galerieImage.push(image._id))
                        await item.save()
                    })
                    const resize = await sharp(img.buffer)
                        .jpeg()
                        .toBuffer()
                    blobWriter.end(resize);
                }
            }
            if(typeof req.files["imageEnAvant"] !== typeof undefined){
                for (const img of req.files["imageEnAvant"]) {
                    const newName = (Math.random().toString(36) + '00000000000000000').slice(2, 10) + Date.now() + path.extname(img.originalname)
                    const blob = bucket.file(newName);
                    const blobWriter = blob.createWriteStream({
                        metadata: {
                            contentType: img.mimetype,
                        },
                    });
                    blobWriter.on('error', (err) => console.log(err));
                    blobWriter.on('finish', async () => {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                            bucket.name
                        }/o/${encodeURI(blob.name)}?alt=media`;
                        const image = new Image({
                            url: publicUrl
                        })
                        await image.save().then(item.imageEnAvant = image._id)
                        item.save().then(data => res.status(200).json({success: true, data: data}))
                    })
                    const resize = await sharp(img.buffer)
                        .jpeg()
                        .toBuffer()
                    blobWriter.end(resize);
                }
            }else{
                item.save().then(data => res.status(200).json({success: true, data: data}))
            }
        })
        .catch(err => res.status(400).json({success: false, errors: err}));
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
