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
            const data = await prisma.menus.findUnique({
                where: {
                    id: parseInt(id, 10),
                },
            });

            res.status(200).json({
                success: true,
                data,
            });
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
                const data = await prisma.menus.update({
                    where: {
                        id: parseInt(id, 10),
                    },
                    data: {
                        name: req.body.name,
                        items: req.body.items,
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
                success: false, errors: e,
            });
        }
        break;
    case 'DELETE':
        try {
            if (token && authorized.includes(token.role)) {
                await prisma.menus.delete({
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
        });
    }
};

export default handler;
