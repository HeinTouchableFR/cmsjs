const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
    destination: {
        type: String,
        required: [true]
    },
    filename: {
        type: String,
        required: [true]
    },
    produit: {
        type: Schema.Types.ObjectId,
        ref: "Valeur"
    },
}, {
    collection: 'images'
})

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema)
