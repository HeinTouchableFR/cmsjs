const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./Valeur.js");

let attributSchema = new Schema(
  {
    nom: {
      type: String,
      required: [true, "Vous devez renseigner un nom pour votre attribut"],
    },
    valeurs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Valeur",
      },
    ],
    filtre: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    collection: "attributs",
  }
);

module.exports =
  mongoose.models.Attribut || mongoose.model("Attribut", attributSchema);
