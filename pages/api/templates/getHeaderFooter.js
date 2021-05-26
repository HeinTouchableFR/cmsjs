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
                    template: true,
                },
            });
            header.template = await populatePost(header.template);

            const footer = await prisma.settings.findUnique({
                where: {
                    data: 'footer',
                },
                include: {
                    template: true,
                },
            });
            footer.template = await populatePost(footer.template);

            res.status(200).json({
                success: true,
                data: {
                    header: header.template,
                    footer: footer.template,
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
