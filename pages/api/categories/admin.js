import dbConnect from "../../../utils/dbConnect";
import Categorie from "../../../models/Categorie";

dbConnect()

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const items = await Categorie.find({categorieParent: null}).populate({
                    path: 'categoriesEnfant',
                    populate: {
                        path: 'categoriesEnfant',
                        model: 'Categorie'
                    }
                })
                res.status(200).json({success: true, data: items})
            }catch (e) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}
