import prisma from 'utils/prisma';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'POST':
        try {
            // Check if database is empty
            const emptyDatabase = await prisma.settings.count();
            if (emptyDatabase === 0) {
                // Table settings
                await prisma.settings.create({
                    data: {
                        data: 'sitename',
                        value: req.body.sitename,
                    },
                });

                await prisma.settings.create({
                    data: {
                        data: 'description',
                        value: req.body.description,
                    },
                });

                await prisma.settings.create({
                    data: {
                        data: 'logo',
                    },
                });

                await prisma.settings.create({
                    data: {
                        data: 'homepage',
                        post: {
                            connect: {
                                id: req.body.homepage,
                            },
                        },
                    },
                });

                await prisma.settings.create({
                    data: {
                        data: 'header',
                        post: {
                            connect: {
                                id: req.body.header,
                            },
                        },
                    },
                });

                await prisma.settings.create({
                    data: {
                        data: 'footer',
                        post: {
                            connect: {
                                id: req.body.footer,
                            },
                        },
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

    await prisma.$disconnect();
};
