import prisma from 'utils/prisma';

const populateTemplate = async (template) => {
    const content = JSON.parse(template.content);
    await Promise.all(content.map(async (layout) => {
        await Promise.all(layout.columns.map(async (column) => {
            await Promise.all(column.elements.map(async (element) => {
                if (element.type === 'menu' && element.content.menu) {
                    // eslint-disable-next-line no-param-reassign
                    element.content.menu = await prisma.menus.findUnique({
                        where: {
                            id: parseInt(element.content.menu, 10),
                        },
                    });
                }
            }));
        }));
    }));
    // eslint-disable-next-line no-param-reassign
    template.content = JSON.stringify(content);
    return {
        content: template.content,
        params: template.params,
    };
};

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'GET':
        try {
            const header = await prisma.settings.findUnique({
                where: {
                    data: 'header',
                },
                include: {
                    template: true,
                },
            });
            header.template = await populateTemplate(header.template);

            const footer = await prisma.settings.findUnique({
                where: {
                    data: 'footer',
                },
                include: {
                    template: true,
                },
            });
            footer.template = await populateTemplate(footer.template);

            res.status(200).json({
                success: true,
                data: {
                    header: header.template,
                    footer: footer.template,
                },
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

export default handler;
