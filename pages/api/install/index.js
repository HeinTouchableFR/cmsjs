import prisma from 'utils/prisma';
import redis from 'utils/redis';

const bcrypt = require('bcrypt');

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'POST':
        try {
            // Check if database is empty
            const emptyDatabase = await prisma.settings.count();
            if (emptyDatabase === 0) {
                redis.del('settings');
                // Table users
                const hash = bcrypt.hashSync(req.body.password, 12);
                const dataUser = await prisma.users.create({
                    data: {
                        name: `${req.body.lastname} ${req.body.firstname}`,
                        email: req.body.email,
                        password: hash,
                        role: 'ADMIN',
                    },
                });

                // Table menus
                const dataMenu = await prisma.menus.create({
                    data: {
                        name: 'Menu',
                        items: '[{"id":"1617995871592","label":"Home","type":"Custom Link","slug":"/","child":[]}]',
                    },
                });

                // Table pages
                const dataHomepage = await prisma.posts.create({
                    data: {
                        title: 'Home Page',
                        slug: 'home-page',
                        description: req.body.description,
                        content: `[{"id":1625267487022,"nbColumns":1,"columns":[{"id":1625267488132,"elements":[{"id":1625267510942,"content":{"text":${req.body.title},"tag":"h1","alignment":"center","desktop":{"typo":{"family":"Ubuntu","size":{"unit":"em","value":"2.5"},"weight":"600","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#4f1271","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"animation":{"name":"bounce","duration":"normal","delay":"0"},"styles":{"textShadow":{"color":"","blur":"10","horizontal":"0","vertical":"10"}}},"type":"title","styles":{"desktop":{"margin":{"unit":"px","top":"25","left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}},{"id":1625267580684,"content":{"text":${req.body.text},"alignment":"left","desktop":{"typo":{"family":"Roboto","size":{"unit":"rem","value":"1"},"weight":"300","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1.5"},"letterSpacing":"0","color":{"normal":"#000","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"animation":{"name":"headShake","duration":"fast","delay":"200"}},"type":"text","styles":{"desktop":{"margin":{"unit":"px","top":"40","left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}],"type":"layout","content":{"params":{"layout":{"stretchSection":true,"contentWidth":{"type":"box","maxWidth":"1330"}},"responsive":{"reverseTabletColumn":false,"reverseMobileColumn":false,"visibility":{"desktop":true,"tablet":true,"mobile":true}}},"desktop":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]`,
                        params: '{"background":"#dfe0e6"}',
                        author: {
                            connect: {
                                id: dataUser.id,
                            },
                        },
                    },
                });

                // Table templates
                const dataHeader = await prisma.posts.create({
                    data: {
                        title: 'Header',
                        postType: 'HEADER',
                        slug: 'header',
                        content: `[{"id":1621456855822,"nbColumns":2,"columns":[{"id":1621456857111,"elements":[{"id":1625263627551,"content":{"alignment":"left","desktop":{"image":{"size":{"width":{"unit":"%","value":"50"},"maxWidth":{"unit":"%","value":"100"},"height":{"unit":"px","value":"auto"}},"opacity":{"normal":"1","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}}},"tablet":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"mobile":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"animation":{"name":"zoomIn","duration":"fast","delay":"0"},"url":"http://localhost:3000/logo.png"},"type":"logo","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]},{"id":1621456857112,"elements":[{"id":1625263643461,"content":{"menu":"${dataMenu.id}","alignment":"flex-end","desktop":{"typo":{"family":"Roboto","size":{"unit":"rem","value":"1.3"},"weight":"300","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#000","hover":"#ff792d"}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"animation":{"name":"fadeIn","duration":"normal","delay":"0"}},"type":"menu","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}],"type":"layout","content":{"params":{"layout":{"stretchSection":true,"contentWidth":{"type":"box","maxWidth":"1330"}},"responsive":{"reverseTabletColumn":false,"reverseMobileColumn":false,"visibility":{"desktop":true,"tablet":true,"mobile":true}}},"desktop":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]`,
                        params: '{"background":"#ffffff"}',
                        author: {
                            connect: {
                                id: dataUser.id,
                            },
                        },
                    },
                });

                const dataFooter = await prisma.posts.create({
                    data: {
                        title: 'Footer',
                        postType: 'FOOTER',
                        slug: 'footer',
                        content: '[{"id":1625263679658,"nbColumns":1,"columns":[{"id":1625263680664,"elements":[{"id":1625263719837,"content":{"text":"Powered by METO","tag":"h2","alignment":"center","desktop":{"typo":{"family":"Roboto","size":{"unit":"px","value":"16"},"weight":"600","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#ffffffff","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}}},"animation":{"name":"none","duration":"normal","delay":"0"},"styles":{"textShadow":{"color":"","blur":"10","horizontal":"0","vertical":"10"}}},"type":"title","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}],"type":"layout","content":{"params":{"layout":{"stretchSection":true,"contentWidth":{"type":"box","maxWidth":"1330"}},"responsive":{"reverseTabletColumn":false,"reverseMobileColumn":false,"visibility":{"desktop":true,"tablet":true,"mobile":true}}},"desktop":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]',
                        params: '{"background": "#3A555F"}',
                        author: {
                            connect: {
                                id: dataUser.id,
                            },
                        },
                    },
                });

                res.status(200).json({
                    success: true,
                    data: {
                        homepage: dataHomepage.id,
                        header: dataHeader.id,
                        footer: dataFooter.id,
                    },
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
