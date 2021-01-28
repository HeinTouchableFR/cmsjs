import dbConnect from "../../../utils/dbConnect";
import Attribut from "../../../models/Attribut";

dbConnect()

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const items = await Attribut.find({})
                res.status(200).json({success: true, data: items})
            }catch (e) {
                res.status(400).json({success: false})
            }
            break;
        case 'POST':
            try {
                const item = await Attribut.create(req.body)
                res.status(201).json({success: true, data: item})
            }catch (e) {
                res.status(400).json({success: false, errors: e})
            }
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"})
            break;
    }
}
