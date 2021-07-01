import prisma from 'utils/prisma';
import jwt from 'next-auth/jwt';

const handler = async (req, res) => {
    const { method, query: { type } } = req;
    const token = await jwt.getToken({
        req, secret: process.env.SECRET,
    });
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];

    switch (method) {
    case 'GET':
        try {
            const data = await prisma.posts.findMany({
                where: {
                    postType: type,
                },
                include: {
                    categories: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: [
                    {
                        title: 'asc',
                    },
                ],
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
            if (token && authorized.includes(token.role)) {
                const data = await prisma.posts.create({
                    data: {
                        title: req.body.title,
                        postType: req.body.postType.toUpperCase(),
                        slug: req.body.slug,
                        description: req.body.description,
                        content: req.body.content,
                        params: req.body.params,
                        author: {
                            connect: {
                                id: token.id,
                            },
                        },
                    },
                });

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
