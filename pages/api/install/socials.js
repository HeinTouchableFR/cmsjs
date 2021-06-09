import prisma from 'utils/prisma';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'POST':
        try {
            // Table settings
            await prisma.settings.create({
                data: {
                    data: 'facebook',
                    value: req.body.facebook,
                },
            });

            await prisma.settings.create({
                data: {
                    data: 'instagram',
                    value: req.body.instagram,
                },
            });

            await prisma.settings.create({
                data: {
                    data: 'linkedin',
                    value: req.body.linkedin,
                },
            });

            await prisma.settings.create({
                data: {
                    data: 'twitter',
                    value: req.body.twitter,
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
