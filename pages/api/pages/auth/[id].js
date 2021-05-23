import { withAuthAdmin } from 'lib/middlewares';
import prisma from 'utils/prisma';

const handler = async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'PUT':
        try {
            const data = await prisma.pages.update({
                where: {
                    id: parseInt(id, 10),
                },
                data: {
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
                    updated: req.body.updated,
                    content: req.body.content,
                    params: req.body.params,
                },
            });

            res.status(200).json({
                success: true,
                data,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                errors: e,
            });
        }
        break;
    case 'DELETE':
        try {
            await prisma.pages.delete({
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
            errors: {
                status: 404,
                code: 1,
                message: 'This method is not available',
            },
        });
        break;
    }
};

export default withAuthAdmin(handler);
