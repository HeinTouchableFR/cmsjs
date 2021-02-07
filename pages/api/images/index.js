import dbConnect from "../../../utils/dbConnect";
import Image from "../../../models/Image";

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const items = await Image.find({})
                res.status(200).json({ success: true, data: items });
            } catch (e) {
                res.status(400).json({ success: false, erreurs: e });
            }
            break;
        default:
            res
                .status(400)
                .json({ success: false, errors: "Cette méthode n'est pas disponible" });
            break;
    }
};
