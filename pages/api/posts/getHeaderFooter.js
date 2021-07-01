import prisma from 'utils/prisma';
import { populatePost } from 'utils/api';

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'GET':
        try {
            const header = await prisma.settings.findUnique({
                where: {
                    data: 'header',
                },
                include: {
                    post: true,
                },
            });
            header.post = await populatePost(header.post);

            const footer = await prisma.settings.findUnique({
                where: {
                    data: 'footer',
                },
                include: {
                    post: true,
                },
            });
            footer.post = await populatePost(footer.post);

            res.status(200).json({
                success: true,
                data: {
                    header: header.post,
                    footer: footer.post,
                },
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

export default handler;
