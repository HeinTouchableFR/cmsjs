import prisma from 'utils/prisma';
import jwt from 'next-auth/jwt';

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
                const data = await prisma.pages.findUnique({
                    where: {
                        id: parseInt(id, 10),
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
    case 'PUT':
        try {
            if (token && authorized.includes(token.role)) {
                const data = await prisma.pages.update({
                    where: {
                        id: parseInt(id, 10),
                    },
                    data: {
                        title: req.body.title,
                        slug: req.body.slug,
                        description: req.body.description,
                        updated: req.body.updated,
                        content: req.body.content,
                        params: req.body.params,
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
    case 'DELETE':
        try {
            if (token && authorized.includes(token.role)) {
                await prisma.pages.delete({
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
};

export default handler;
