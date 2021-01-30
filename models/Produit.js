const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Valeur.js');

let produitSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Vous devez renseigner un nom pour votre produit']
    },
    description: {
        type: String,
    },
    prix: {
        type: Schema.Types.Number,
        required: [true, 'Vous devez renseigner un prix pour votre produit']
    },
    prixPromo: {
        type: Schema.Types.Number,
    },
    enVente: {
        type: Schema.Types.Boolean,
        default: false
    },
    largeur: {
        type: Schema.Types.Number,
    },
    hauteur: {
        type: Schema.Types.Number,
    },
    longueur: {
        type: Schema.Types.Number,
    },

    poids: {
        type: Schema.Types.Number,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    }],
    imageEnAvant: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    galerieImage: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }]
}, {
    collection: 'produits'
})

module.exports = mongoose.models.Produit || mongoose.model('Produit', produitSchema)
