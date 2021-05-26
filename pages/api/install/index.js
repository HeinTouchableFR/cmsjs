import prisma from 'utils/prisma';

const bcrypt = require('bcrypt');

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'POST':
        try {
            // Check if database is empty
            const emptyDatabase = await prisma.settings.count();
            if (emptyDatabase === 0) {
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
                const dataHomepage = await prisma.pages.create({
                    data: {
                        title: 'Home Page',
                        slug: 'home-page',
                        description: req.body.description,
                        content: `[{"id":1621695832284,"nbColumns":1,"columns":[{"id":1621695833239,"elements":[{"id":1621695835406,"content":{"alignment":"center","desktop":{"image":{"size":{"width":{"unit":"%","value":"50"},"maxWidth":{"unit":"%","value":"100"},"height":{"unit":"px","value":"auto"}},"opacity":{"normal":"1","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"zoomIn","duration":"1s","delay":"0"}},"tablet":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"logo","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}],"type":"layout","content":{"params":{"layout":{"stretchSection":true,"contentWidth":{"type":"box","maxWidth":"1330"}},"responsive":{"reverseTabletColumn":false,"reverseMobileColumn":false,"visibility":{"desktop":true,"tablet":true,"mobile":true}}},"desktop":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}},{"id":1621696862636,"nbColumns":1,"columns":[{"id":1621696863848,"elements":[{"id":1621696866162,"content":{"text":${req.body.title},"tag":"h1","alignment":"center","desktop":{"typo":{"family":"Ubuntu","size":{"unit":"em","value":"2.5"},"weight":"600","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#4f1271","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"bounce","duration":"1s","delay":"0"}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"styles":{"textShadow":{"color":"","blur":"10","horizontal":"0","vertical":"10"}}},"type":"title","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}},{"id":1621696896535,"content":{"text":${req.body.text},"alignment":"left","desktop":{"typo":{"family":"Roboto","size":{"unit":"rem","value":"1"},"weight":"300","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1.5"},"letterSpacing":"0","color":{"normal":"#000","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"swing","duration":"1s","delay":"0"}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"text","styles":{"desktop":{"margin":{"unit":"px","top":"40","left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}],"type":"layout","content":{"params":{"layout":{"stretchSection":true,"contentWidth":{"type":"box","maxWidth":"1330"}},"responsive":{"reverseTabletColumn":false,"reverseMobileColumn":false,"visibility":{"desktop":true,"tablet":true,"mobile":true}}},"desktop":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]`,
                        params: '{"background":"#dfe0e6"}',
                        author: {
                            connect: {
                                id: dataUser.id,
                            },
                        },
                    },
                });

                // Table templates
                const dataHeader = await prisma.templates.create({
                    data: {
                        type: 'header',
                        name: 'Header',
                        content: `[{"id":1621456855822,"nbColumns":2,"columns":[{"id":1621456857111,"elements":[{"id":1621456863267,"content":{"alignment":"left","desktop":{"image":{"size":{"width":{"unit":"%","value":"25"},"maxWidth":{"unit":"%","value":"100"},"height":{"unit":"px","value":"auto"}},"opacity":{"normal":"1","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"logo","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]},{"id":1621456857112,"elements":[{"id":1621456870340,"content":{"menu":"${dataMenu.id}","alignment":"flex-end","desktop":{"typo":{"family":"Roboto","size":{"unit":"rem","value":"1.3"},"weight":"300","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#000","hover":"#ff792d"}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"menu","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}],"type":"layout","content":{"params":{"layout":{"stretchSection":true,"contentWidth":{"type":"box","maxWidth":"1330"}},"responsive":{"reverseTabletColumn":false,"reverseMobileColumn":false,"visibility":{"desktop":true,"tablet":true,"mobile":true}}},"desktop":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]`,
                        params: '{"background":"#ffffff"}',
                    },
                });

                const dataFooter = await prisma.templates.create({
                    data: {
                        type: 'footer',
                        name: 'Footer',
                        content: '[{"id":1621456908917,"nbColumns":1,"columns":[{"id":1621456911721,"elements":[{"id":1621456918260,"content":{"text":"Powered by METO","tag":"h2","alignment":"center","desktop":{"typo":{"family":"Roboto","size":{"unit":"rem","value":"1"},"weight":"600","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#ffffff","hover":"#a7a7a7"}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"styles":{"textShadow":{"color":"","blur":"10","horizontal":"0","vertical":"10"}}},"type":"title","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}],"type":"layout","content":{"params":{"layout":{"stretchSection":true,"contentWidth":{"type":"box","maxWidth":"1330"}},"responsive":{"reverseTabletColumn":false,"reverseMobileColumn":false,"visibility":{"desktop":true,"tablet":true,"mobile":true}}},"desktop":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]',
                        params: '{"background": "#3A555F"}',
                    },
                });

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
                        data: 'locale',
                        value: req.body.locale,
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
                        page: {
                            connect: {
                                id: dataHomepage.id,
                            },
                        },
                    },
                });

                await prisma.settings.create({
                    data: {
                        data: 'header',
                        template: {
                            connect: {
                                id: dataHeader.id,
                            },
                        },
                    },
                });

                await prisma.settings.create({
                    data: {
                        data: 'footer',
                        template: {
                            connect: {
                                id: dataFooter.id,
                            },
                        },
                    },
                });

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
