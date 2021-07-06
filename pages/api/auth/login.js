import prisma from 'utils/prisma';

const bcrypt = require('bcrypt');

const handler = async (req, res) => {
    const { method } = req;
    switch (method) {
    case 'POST':
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: req.body.email,
                },
            });

            const isAuthorized = bcrypt.compareSync(req.body.password, user.password);
            if (isAuthorized === true) {
                res.status(200).json({
                    success: true,
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        image: user.image,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        role: user.role,
                    },
                });
            } else {
                res.status(200).json({
                    success: true, data: null,
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
