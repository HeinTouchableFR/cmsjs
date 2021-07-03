import prisma from 'utils/prisma';
import { populatePost } from 'utils/api';
import redis from 'utils/redis';

const handler = async (req, res) => {
    const { query: { slug },
        method } = req;

    let start = Date.now();
    let cache = await redis.get(slug);
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
                let data = await prisma.posts.findUnique({
                    where: {
                        slug,
                    },
                    include: {
                        categories: true,
                        comments: {
                            include: {
                                author: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                            orderBy: [
                                {
                                    published: 'desc',
                                },
                            ],
                        },
                    },
                });
                data = await populatePost(data);
                result.data = data;
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set(slug, JSON.stringify(result.data), 'EX', 86400);
                res.status(200).json({
                    success: true, result,
                });
            }
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

    await prisma.$disconnect();
};

export default handler;
