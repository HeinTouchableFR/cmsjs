import prisma from 'utils/prisma';
import redis from 'utils/redis';
import { populatePost } from 'utils/api';

const handler = async (req, res) => {
    const { query: { name },
        method } = req;

    let start = Date.now();
    let cache = await redis.get(name);
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
                const data = await prisma.settings.findUnique({
                    where: {
                        data: name,
                    },
                    include: {
                        image: true,
                        post: {
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
                        },
                    },
                });
                if (data.post) {
                    data.post = await populatePost(data.post);
                }
                result.data = data;
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set(name, JSON.stringify(result.data), 'EX', 86400);
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
