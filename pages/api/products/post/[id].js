import nextConnect from 'next-connect';
import multer from 'multer';

import Produit from 'models/Produit';
import Image from 'models/Image';
import Categorie from 'models/Categorie';

const sharp = require('sharp');

const oneMegabyteInBytes = 1000000;

const upload = multer({
    limits: { fileSize: oneMegabyteInBytes * 2 },
    /*fileFilter: (req, file, cb) => {
      const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(file.mimetype);
      cb(null, acceptFile);
    },*/
});

const apiRoute = nextConnect({
    onError(error, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.fields([{ name: 'imageEnAvant' }, { name: 'galerieImage' }]));

apiRoute.put(async (req, res) => {
    const item = await Produit.findById(req.query.id);

    if (!item) {
        return res.status(400).json({ success: false, data: 'Produit inconnu' });
    }
    item.nom = req.body.nom;
    item.description = req.body.description;
    item.prix = req.body.prix;
    item.prixPromo = req.body.prixPromo;
    item.enVente = req.body.produitEnVente;
    item.largeur = req.body.largeur;
    item.longueur = req.body.longueur;
    item.hauteur = req.body.hauteur;
    item.poids = req.body.poids;

    if (typeof req.files['imageEnAvant'] !== typeof undefined) {
        for (const img of req.files['imageEnAvant']) {
            const resize = await sharp(img.buffer).resize(640, 640).jpeg().toBuffer();
            const base64data = new Buffer(resize, 'binary').toString('base64');
            const image = new Image({
                base: base64data,
            });
            await image.save().then((item.imageEnAvant = image._id));
        }
    }

    if (typeof req.files['galerieImage'] !== typeof undefined) {
        for (const img of req.files['galerieImage']) {
            const resize = await sharp(img.buffer).resize(640, 640).jpeg().toBuffer();
            const base64data = new Buffer(resize, 'binary').toString('base64');
            const image = new Image({
                base: base64data,
            });
            image.save().then(item.galerieImage.push(image._id));
        }
    }

    const categoriesFromReq = JSON.parse(req.body.categories);

    let categories = item.categories
        .filter((x) => !categoriesFromReq.includes(x))
        .concat(categoriesFromReq.filter((x) => !item.categories.includes(x)));

    if (categories) {
        for (const element of categories) {
            const c = await Categorie.findById(element);
            c.produits.includes(item._id) ? c.produits.splice(c.produits.indexOf(item._id), 1) : c.produits.push(item._id);

            c.save();
        }
    }
    item.categories = categoriesFromReq;
    item.save()
        .then((data) => res.status(200).json({ success: true, data: data }))
        .catch((err) => res.status(400).json({ success: false, errors: err }));
});
export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
