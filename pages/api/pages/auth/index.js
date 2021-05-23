import { withAuthAdmin } from 'lib/middlewares';
import prisma from 'utils/prisma';

const handler = async (req, res) => {
    const { method } = req;
    switch (method) {
    case 'POST':
        try {
            const data = await prisma.pages.create({
                data: {
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
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
