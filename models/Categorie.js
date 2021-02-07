const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let categorieSchema = new Schema(
  {
    nom: {
      type: String,
      required: [true, "Vous devez renseigner un nom pour votre catégorie"],
    },
    description: {
      type: Schema.Types.String,
    },
    categoriesEnfant: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categorie",
      },
    ],
    categorieParent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
    },
    produits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Produit",
      },
    ],
  },
  {
    collection: "categories",
  }
);
module.exports =
  mongoose.models.Categorie || mongoose.model("Categorie", categorieSchema);
