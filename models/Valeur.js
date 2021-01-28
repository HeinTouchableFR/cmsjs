const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let valeurSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Vous devez renseigner un nom pour votre valeur']
    },
    attribut: {
        type: Schema.Types.ObjectId,
        ref: "Attribut"
    }
}, {
    collection: 'valeurs'
})

module.exports = mongoose.models.Valeur || mongoose.model('Valeur', valeurSchema)
