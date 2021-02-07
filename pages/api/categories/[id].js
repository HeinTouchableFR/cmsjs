import dbConnect from "../../../utils/dbConnect";
import Categorie from "../../../models/Categorie";
import Attribut from "../../../models/Attribut";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const item = await Categorie.findById(id);

        if (!item) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: item });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const item = await Categorie.findById(id);
        if (!item) {
          return res
            .status(400)
            .json({ success: false, errors: "L'élément n'existe pas." });
        }
        item.nom = req.body.nom;
        item.description = req.body.description;
        item.categorieParent = item.categorieParent ? item.categorieParent : "";

        if (
          !(req.body.categorieParent == item.categorieParent) &&
          req.body.categorieParent
        ) {
          const c = await Categorie.findById(req.body.categorieParent);
          c.categoriesEnfant.push(item);
          c.save();
        }
        if (
          !(req.body.categorieParent == item.categorieParent) &&
          item.categorieParent
        ) {
          const c = await Categorie.findById(item.categorieParent);
          var index = c.categoriesEnfant.indexOf(item._id);
          if (index > -1) {
            c.categoriesEnfant.splice(index, 1);
          }
          c.save();
        }
        item.categorieParent = req.body.categorieParent;
        item
          .save(item)
          .then((data) => res.status(200).json({ success: true, data: data }))
          .catch((err) =>
            res.status(400).json({ success: false, errors: err })
          );
      } catch (e) {
        res.status(400).json({ success: false, errors: e });
      }
      break;
    case "DELETE":
      async function handleDelete(e) {
        const item = await Categorie.findByIdAndDelete(e);

        if (item && item.categoriesEnfant) {
          for (const element of item.categoriesEnfant) {
            await handleDelete(element);
          }
        }
      }

      try {
        await handleDelete(id);
        return res.status(200).json({ success: true, data: "test" });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
