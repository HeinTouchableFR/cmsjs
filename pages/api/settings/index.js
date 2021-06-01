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
            const data = await prisma.settings.findMany({
                include: {
                    image: true,
                    template: true,
                },
            });
            res.status(200).json({
                success: true, data,
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
                // eslint-disable-next-line no-restricted-syntax
                for (const [key, value] of Object.entries(req.body)) {
                    const data = {
                    };
                    switch (value.type) {
                    case 'value':
                        data.value = value.value;
                        break;
                    case 'image':
                        if (value.image) {
                            data.image = {
                                connect: {
                                    id: value.image.id,
                                },
                            };
                        } else {
                            data.image = {
                                disconnect: true,
                            };
                        }
                        break;
                    case 'page':
                        if (value.page) {
                            data.page = {
                                connect: {
                                    id: value.page.id,
                                },
                            };
                        } else {
                            data.image = {
                                disconnect: true,
                            };
                        }
                        break;
                    case 'template':
                        if (value.template) {
                            data.template = {
                                connect: {
                                    id: value.template.id,
                                },
                            };
                        } else {
                            data.image = {
                                disconnect: true,
                            };
                        }
                        break;
                    default:
                        break;
                    }
                    // eslint-disable-next-line no-await-in-loop
                    await prisma.settings.update({
                        where: {
                            data: key,
                        },
                        data,
                    });
                }

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
};

export default handler;
