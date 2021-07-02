import prisma from 'utils/prisma';
import {populatePost} from 'utils/api';
import redis from '../../../utils/redis';

const handler = async (req, res) => {
    const { method } = req;

    let start = Date.now();
    let cacheHeader = await redis.get('header');
    let cacheFooter = await redis.get('footer');
    cacheHeader = JSON.parse(cacheHeader);
    cacheFooter = JSON.parse(cacheFooter);
    const result = {
    };

    switch (method) {
    case 'GET':
        try {
            if (cacheHeader && cacheFooter) {
                result.data = {
                    header: cacheHeader,
                    footer: cacheFooter,
                };
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
                redis.set('header', JSON.stringify(result.data.header), 'EX', 86400);
                redis.set('footer', JSON.stringify(result.data.footer), 'EX', 86400);
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
