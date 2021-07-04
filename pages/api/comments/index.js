import prisma from 'utils/prisma';
import jwt from 'next-auth/jwt';
import redis from 'utils/redis';

const handler = async (req, res) => {
    const { method } = req;
    const token = await jwt.getToken({
        req, secret: process.env.SECRET,
    });

    switch (method) {
    case 'GET':
        try {
            const data = await prisma.comments.findMany({
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

            res.status(200).json({
                success: true, data,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                errors: e,
            });
        }
        break;
    case 'POST':
        try {
            if (token) {
                const data = await prisma.comments.create({
                    data: {
                        content: req.body.content,
                        post: {
                            connect: {
                                id: req.body.post,
                            },
                        },
                        author: {
                            connect: {
                                id: token.id,
                            },
                        },
                    },
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                        post: {
                            select: {
                                slug: true,
                            },
                        },
                    },
                });

                redis.del(data.post.slug);

                let cacheHomepage = await redis.get('homepage');
                cacheHomepage = JSON.parse(cacheHomepage);

                if (cacheHomepage && cacheHomepage.post.slug === data.post.slug) {
                    redis.del('homepage');
                }

                res.status(200).json({
                    success: true, data,
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
