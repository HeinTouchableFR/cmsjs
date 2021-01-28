import dbConnect from "../../../utils/dbConnect";
import Valeur from "../../../models/Valeur";

dbConnect()

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET':
            try {
                const item = await Valeur.findById(id)

                if(!item){
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: item})
            }catch (e) {
                res.status(400).json({success: false})
            }
            break;
        case 'PUT':
            try {
                const item = await Valeur.findByIdAndUpdate(id, req.body, {
                    runValidators: true
                })

                if(!item){
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: item})
            }catch (e) {
                res.status(400).json({success: false})
            }
            break;
        case 'DELETE':
                try {
                    const deletedItem = await Valeur.deleteOne({_id: id})

                    if(!deletedItem){
                        return res.status(400).json({success: false})
                    }

                    return res.status(200).json({success: true, data: {}})
                }catch (e) {
                    res.status(400).json({success: false})
                }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}
