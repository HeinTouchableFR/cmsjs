import prisma from 'utils/prisma';

export default async (req, res) => {
    const { query: { id },
        method } = req;

    switch (method) {
    case 'PUT':
        try {
            const data = await prisma.templates.update({
                where: {
                    id: parseInt(id, 10),
                },
                data: {
                    content: req.body.content,
                    params: req.body.params,
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
    case 'DELETE':
        try {
            await prisma.pages.delete({
                where: {
                    id: parseInt(id, 10),
                },
            });
            res.status(200).json({
                success: true,
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
};
