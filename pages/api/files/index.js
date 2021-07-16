import jwt from 'next-auth/jwt';
import prisma from 'utils/prisma';

const handle = async (req, res) => {
    const { method, query: { mimeType } } = req;
    const token = await jwt.getToken({
        req, secret: process.env.SECRET,
    });
    const authorized = ['ADMIN', 'EDITOR', 'MODERATOR'];

    switch (method) {
    case 'GET':
        try {
            const types = JSON.parse(mimeType);
            if (token && authorized.includes(token.role)) {
                const data = await prisma.files.findMany({
                    where: {
                        mimeType: {
                            in: types,
                        },
                    },
                    orderBy: [
                        {
                            created_at: 'desc',
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

export default handle;
