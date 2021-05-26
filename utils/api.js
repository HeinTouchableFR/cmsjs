import prisma from './prisma';

export const populatePost = async (post, mode = 'render') => {
    const content = JSON.parse(post.content);
    await Promise.all(content.map(async (layout) => {
        await Promise.all(layout.columns.map(async (column) => {
            await Promise.all(column.elements.map(async (element) => {
                if (element.type === 'menu' && element.content.menu && mode === 'render') {
                    // eslint-disable-next-line no-param-reassign
                    element.content.menu = await prisma.menus.findUnique({
                        where: {
                            id: parseInt(element.content.menu, 10),
                        },
                    });
                }
                if (element.type === 'logo') {
                    const data = await prisma.settings.findUnique({
                        where: {
                            data: 'logo',
                        },
                        include: {
                            image: true,
                        },
                    });
                    // eslint-disable-next-line no-param-reassign
                    element.content.url = data.image ? `${process.env.MEDIA_SERVER}/${data.image.name}` : `${process.env.SERVER}/logo.png`;
                }
            }));
        }));
    }));
    // eslint-disable-next-line no-param-reassign
    post.content = JSON.stringify(content);
    return post;
};
