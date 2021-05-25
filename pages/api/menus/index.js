import prisma from 'utils/prisma';
import jwt from 'next-auth/jwt';

const handler = async (req, res) => {
    const { method } = req;
    const token = await jwt.getToken({
        req, secret: process.env.SECRET,
    });
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];

    switch (method) {
    case 'GET':
        try {
            if (token && authorized.includes(token.role)) {
                const data = await prisma.menus.findMany({
                    orderBy: [
                        {
                            name: 'asc',
                        },
                    ],
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
    case 'POST':
        try {
            if (token && authorized.includes(token.role)) {
                const data = await prisma.menus.create({
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
