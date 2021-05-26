import prisma from 'utils/prisma';
import { populatePost } from 'utils/api';

const handler = async (req, res) => {
    const { query: { slug },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            let data = await prisma.pages.findUnique({
                where: {
                    slug,
                },
            });
            data = await populatePost(data);

            res.status(200).json({
                success: true, data,
            });
        } catch (e) {
            res.status(400).json({
                success: false, errors: e,
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
