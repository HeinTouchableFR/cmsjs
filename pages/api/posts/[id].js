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
                const data = await prisma.posts.update({
                    where: {
                        id: parseInt(id, 10),
                    },
                    data: {
                        title: req.body.title,
                        postType: req.body.postType,
                        slug: req.body.slug,
                        description: req.body.description,
                        updated: req.body.updated,
                        content: req.body.content,
                        params: req.body.params,
                    },
                });
                redis.del(`${process.env.NODE_ENV === 'development' ? 'dev_' : 'prod_'}${data.slug}`);

                let cacheHomepage = await redis.get(`${process.env.NODE_ENV === 'development' ? 'dev_' : 'prod_'}homepage`);
                cacheHomepage = JSON.parse(cacheHomepage);

                if (cacheHomepage && cacheHomepage.post.id === parseInt(id, 10)) {
                    redis.del(`${process.env.NODE_ENV === 'development' ? 'dev_' : 'prod_'}homepage`);
                }

                if (data.postType === 'HEADER') {
                    redis.del(`${process.env.NODE_ENV === 'development' ? 'dev_' : 'prod_'}header`);
                }

                if (data.postType === 'FOOTER') {
                    redis.del(`${process.env.NODE_ENV === 'development' ? 'dev_' : 'prod_'}footer`);
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
            if (token && authorized.includes(token.role)) {
                await prisma.posts.delete({
                    where: {
                        id: parseInt(id, 10),
                    },
                });

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
