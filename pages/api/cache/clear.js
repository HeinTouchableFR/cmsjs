import prisma from 'utils/prisma';
import jwt from 'next-auth/jwt';
import redis from '../../../utils/redis';

const handler = async (req, res) => {
    const { method, query: { type } } = req;
    const token = await jwt.getToken({
        req, secret: process.env.SECRET,
    });
    const authorized = ['ADMIN'];

    switch (method) {
    case 'GET':
        try {
            if (token && authorized.includes(token.role)) {
                await redis.flushall('ASYNC', () => {
                    res.status(200).json({
                        success: true,
                        data: {
                            message: 'Cache cleared',
                        },
                    });
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
