import {
    auth, db,
} from 'utils/dbConnect';
import * as admin from 'firebase-admin';
import { firebase } from 'utils/firebaseClient';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'POST':
        firebase.auth().signInWithCustomToken(req.body.installToken)
            .then(async () => {
                const menu = {
                    name: 'Menu',
                    items: '[{"id":"1617995871592","label":"Home","type":"Custom Link","slug":"/","child":[]}]',
                };
                const dataMenu = await db.collection('menus').add(menu);

                const homePage = {
                    author: 'Administrator',
                    content: '[]',
                    params: '{"background":{"enableDarkMode":false,"light":"#f7fafb","dark":"#171933"}}',
                    published: new Date().toUTCString(),
                    title: 'Home Page',
                    slug: 'home-page',
                };
                const dataHomePage = await db.collection('pages').add(homePage);

                const header = {
                    name: 'Header',
                    type: 'header',
                    content: `[{"id":1617027938859,"nbColumns":2,"columns":[{"id":1617027939627,"elements":[{"id":1617027942354,"content":{"alignment":"left","desktop":{"image":{"size":{"width":{"unit":"px","value":"150"},"maxWidth":{"unit":"%","value":"100"},"height":{"unit":"px","value":"auto"}},"opacity":{"normal":"1","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"","":"","delay":""}},"tablet":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"logo","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]},{"id":1617027939628,"elements":[{"id":1617804372459,"content":{"menu":{"value":"${dataMenu.id}"},"alignment":"flex-end","desktop":{"typo":{"family":"Roboto","size":{"unit":"rem","value":"1.4"},"weight":"300","transform":"capitalize","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#000000","hover":"#ff792d"}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"","duration":"","delay":""}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"menu","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}]}]`,
                    params: '{"background":{"enableDarkMode":false,"light":"#ffffff","dark":"#171933"}}',
                };
                await db.doc('templates/header').set(header, {
                    merge: true,
                });

                const footer = {
                    name: 'Footer',
                    type: 'footer',
                    content: '[{"id":1619450107696,"nbColumns":1,"columns":[{"id":1619450108680,"elements":[{"id":1619450150076,"content":{"text":"Powered by CMSJS - By METO","tag":"h2","alignment":"center","desktop":{"typo":{"family":"Roboto","size":{"unit":"px","value":"16"},"weight":"600","transform":"initial","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#ffffff","hover":"#a7a7a7"}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"none","duration":"1s","delay":"0"}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"styles":{"textShadow":{"color":"","blur":"10","horizontal":"0","vertical":"10"}}},"type":"title","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}]}]',
                    params: '{"background":{"enableDarkMode":false,"light":"#5c8898","dark":"#171933"}}',
                };
                await db.doc('templates/footer').set(footer, {
                    merge: true,
                });

                const general = {
                    footer: 'footer',
                    header: 'header',
                    homePage: dataHomePage.id,
                    logo: {
                        image: {
                            url: '/logo.png',
                        },
                    },
                    sitename: req.body.sitename,
                };
                await db.doc('settings/general').set(general, {
                    merge: true,
                });

                // Compte admin
                const userInfo = {
                    email: req.body.email,
                    password: req.body.password,
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                };
                auth.createUser({
                    email: userInfo.email,
                    emailVerified: false,
                    password: userInfo.password,
                    displayName: `${userInfo.lastname} ${userInfo.firstname}`,
                })
                    .then(async (user) => {
                        const customData = {
                            lastname: userInfo.lastname,
                            firstname: userInfo.firstname,
                        };
                        await auth.setCustomUserClaims(user.uid, {
                            roles: ['admin', 'editor', 'moderator', 'user'],
                        });
                        db.doc(`users/${user.uid}`).set(customData, {
                            merge: true,
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        res.status(400).json({
                            success: false,
                            errors: {
                                code: errorCode,
                                message: errorMessage,
                            },
                        });
                    });

                // Security
                const source = `service cloud.firestore {
                                    match /databases/{database}/documents {
                                        match /users/{uid} {
                                              allow read, write: if isUser(uid);
                                        }
                                        function isUser(uid) {
                                          return isSignedIn() && request.auth.uid == uid;
                                        }
                                        function isSignedIn() {
                                          return request.auth.uid != null;
                                        }
                                        function isAdmin() {
                                          return request.auth.token.roles in ["admin"];
                                        }
                                    }
                     }`;
                await admin.securityRules().releaseFirestoreRulesetFromSource(source);

                // Delete install account
                const user = firebase.auth().currentUser;

                user.delete().then(() => {
                    res.status(200).json({
                        success: true,
                    });
                }).catch((e) => {
                    res.status(400).json({
                        success: false,
                        errors: e,
                    });
                });
            })
            .catch((e) => {
                res.status(400).json({
                    success: false,
                    errors: e,
                });
            });
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
