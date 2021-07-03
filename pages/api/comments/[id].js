import prisma from 'utils/prisma';
import jwt from 'next-auth/jwt';
import { populatePost } from 'utils/api';
import redis from 'utils/redis';

const handler = async (req, res) => {
    const { query: { id },
        method } = req;
    const token = await jwt.getToken({
        req, secret: process.env.SECRET,
    });
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];

    switch (method) {
    case 'GET':
        try {
            if (token && authorized.includes(token.role)) {
                let data = await prisma.posts.findUnique({
                    where: {
                        id: parseInt(id, 10),
                    },
                    include: {
                        categories: true,
                    },
                });
                data = await populatePost(data, 'preview');

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
    case 'PUT':
        try {
            if (token && authorized.includes(token.role)) {
                let data = await prisma.comments.findUnique({
                    where: {
                        id: parseInt(id, 10),
                    },
                    include: {
                        author: {
                            select: {
                                id: true,
                            },
                        },
                        post: {
                            select: {
                                slug: true,
                            },
                        },
                    },
                });

                if (data.author.id === token.id) {
                    redis.del(data.post.slug);
                    data = await prisma.comments.update({
                        where: {
                            id: parseInt(id, 10),
                        },
                        data: {
                            content: req.body.content,
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
    case 'DELETE':
        try {
            if (token) {
                const data = await prisma.comments.findUnique({
                    where: {
                        id: parseInt(id, 10),
                    },
                    include: {
                        author: {
                            select: {
                                id: true,
                            },
                        },
                        post: {
                            select: {
                                slug: true,
                            },
                        },
                    },
                });

                if (data.author.id === token.id) {
                    await prisma.comments.deleteMany({
                        where: {
                            id: parseInt(id, 10),
                            authorId: token.id,
                        },
                    });
                    redis.del(data.post.slug);
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
            console.log(e);
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
