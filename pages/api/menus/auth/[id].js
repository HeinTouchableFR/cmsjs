import prisma from 'utils/prisma';
import { withAuthAdmin } from 'lib/middlewares';

const handler = async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'PUT':
        try {
            const data = await prisma.menus.update({
                where: {
                    id: parseInt(id, 10),
                },
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
    case 'DELETE':
        try {
            await prisma.menus.delete({
                where: {
                    id: parseInt(id, 10),
                },
            })
            res.status(200).json({
                success: true,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                errors: e,
            });
        }
        break;
    default:
        res.status(400).json({
            success: false,
        });
    }
};

export default withAuthAdmin(handler);
