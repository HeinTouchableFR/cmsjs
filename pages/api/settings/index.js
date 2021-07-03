import prisma from 'utils/prisma';
import jwt from 'next-auth/jwt';
import redis from 'utils/redis';

const handler = async (req, res) => {
    const { method } = req;
    const token = await jwt.getToken({
        req, secret: process.env.SECRET,
    });
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];

    let start = Date.now();
    let cache = await redis.get('settings');
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
                result.data = await prisma.settings.findMany({
                    include: {
                        image: true,
                        post: true,
                    },
                });
                result.type = 'api';
                result.latency = Date.now() - start;
                redis.set('settings', JSON.stringify(result.data), 'EX', 86400);
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
    case 'PUT':
        try {
            if (token && authorized.includes(token.role)) {
                // eslint-disable-next-line no-restricted-syntax
                for (const [key, value] of Object.entries(req.body)) {
                    const data = {
                    };
                    switch (value.type) {
                    case 'value':
                        data.value = value.value;
                        break;
                    case 'image':
                        if (value.image) {
                            data.image = {
                                connect: {
                                    id: value.image.id,
                                },
                            };
                        } else {
                            data.image = {
                                disconnect: true,
                            };
                        }
                        break;
                    case 'post':
                        if (value.value) {
                            data.post = {
                                connect: {
                                    id: parseInt(value.value, 10),
                                },
                            };
                        } else {
                            data.post = {
                                disconnect: true,
                            };
                        }
                        break;
                    default:
                        break;
                    }
                    // eslint-disable-next-line no-await-in-loop
                    await prisma.settings.update({
                        where: {
                            data: key,
                        },
                        data,
                    });
                }

                res.status(200).json({
                    success: true,
                });
            } else {
                res.status(401).json({
                    success: false,
                    errors: {
                        status: 401,
                        code: 1,
                        message: 'Unauthorized',
                    },
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
