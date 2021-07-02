import prisma from 'utils/prisma';
import { populatePost } from 'utils/api';

const Redis = require('ioredis');

const redis = new Redis('redis://:40e0f41cc3344026891f1ae47812559c@eu1-expert-cheetah-32309.upstash.io:32309');

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
                        },
                    },
                });
                data = await populatePost(data);
                result.data = data;
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set(slug, JSON.stringify(result.data), 'EX', 60);
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
