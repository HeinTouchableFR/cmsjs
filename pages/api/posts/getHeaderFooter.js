import prisma from 'utils/prisma';
import {populatePost} from 'utils/api';
import redis from '../../../utils/redis';

const handler = async (req, res) => {
    const { method } = req;

    let start = Date.now();
    let cache = await redis.get('headerfooter');
    cache = JSON.parse(cache);
    const result = {
    };

    switch (method) {
    case 'GET':
        try {
            if (cache) {
                result.data = cache;
                result.type = 'redis';
                result.latency = Date.now() - start;
                res.status(200).json({
                    success: true, result,
                });
            } else {
                start = Date.now();
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

                result.data = {
                    header: header.post,
                    footer: footer.post,
                };
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set('headerfooter', JSON.stringify(result.data), 'EX', 60);
                res.status(200).json({
                    success: true, result,
                });
            }
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

    await prisma.$disconnect();
};

export default handler;
