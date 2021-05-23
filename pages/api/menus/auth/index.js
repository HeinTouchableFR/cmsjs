import prisma from 'utils/prisma';
import { withAuthAdmin } from 'lib/middlewares';

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'POST':
        try {
            const data = await prisma.menus.create({
                data: {
                    name: req.body.name,
                    items: req.body.items,
                },
            });
            res.status(200).json({
                success: true,
                data,
            });
        } catch (e) {
            res.status(400).json({
                success: false, errors: e,
            });
        }
        break;
    default:
        res.status(400).json({
            success: false, errors: "Cette méthode n'est pas disponible",
        });
        break;
    }
};
export default withAuthAdmin(handler);
