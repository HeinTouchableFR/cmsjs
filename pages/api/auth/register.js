import prisma from 'utils/prisma';

const bcrypt = require('bcrypt');

const handler = async (req, res) => {
    const { method } = req;
    switch (method) {
    case 'POST':
        try {
            const hash = bcrypt.hashSync(req.body.password, 12);
            const data = await prisma.users.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
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
