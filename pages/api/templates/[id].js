import prisma from 'utils/prisma';

export default async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            const data = await prisma.templates.findUnique({
                where: {
                    id: parseInt(id, 10),
                },
            });

            if (!data) {
                res.status(400).json({
                    success: false,
                    errors: {
                        status: 404,
                        code: 1,
                        message: 'Item not found',
                    },
                });
            }

            res.status(200).json({
                success: true,
                data,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
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
