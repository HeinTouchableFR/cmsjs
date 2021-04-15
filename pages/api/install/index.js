import {auth, db} from 'utils/dbConnect';
import * as admin from 'firebase-admin';
import {firebase} from 'utils/firebaseClient';

export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case 'POST':
            firebase.auth().signInWithCustomToken(req.body.installToken)
                .then(async (userCredential) => {
                    let menu = {
                        name: "Menu",
                        items: `[{"id":"1617995871592","label":"Home","type":"Custom Link","slug":"/","child":[]}]`,
                    };
                    const dataMenu = await db.collection('menus').add(menu);

                    let homePage = {
                        author: "Administrator",
                        childPages: [],
                        content: "[]",
                        parentPage: "",
                        published: new Date().toUTCString(),
                        title: "Home Page",
                        slug: "home-page"
                    };
                    const dataHomePage = await db.collection('pages').add(homePage);
                    await db.doc('settings/homepage').set({value: dataHomePage.id}, {merge: true})
                    await db.doc('settings/sitename').set({value: req.body.sitename}, {merge: true})

                    let logo = {
                        image: {
                            url: '/logo.png'
                        }
                    }
                    await db.doc('settings/logo').set(logo, {merge: true})

                    let header = {
                        name: 'header',
                        content: `[{"id":1617027938859,"nbColumns":2,"columns":[{"id":1617027939627,"elements":[{"id":1617027942354,"content":{"alignment":"left","desktop":{"image":{"size":{"width":{"unit":"px","value":"150"},"maxWidth":{"unit":"%","value":"100"},"height":{"unit":"px","value":"auto"}},"opacity":{"normal":"1","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"","":"","delay":""}},"tablet":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"image":{"size":{"width":{"unit":"","value":""},"maxWidth":{"unit":"","value":""},"height":{"unit":"","value":""}},"opacity":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"logo","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]},{"id":1617027939628,"elements":[{"id":1617804372459,"content":{"menu":{"value":"${dataMenu.id}"},"alignment":"flex-end","desktop":{"typo":{"family":"Roboto","size":{"unit":"rem","value":"2"},"weight":"300","transform":"capitalize","style":"normal","decoration":"","lineHeight":{"unit":"em","value":"1"},"letterSpacing":"0","color":{"normal":"#000000","hover":"#ff792d"}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"},"hover":{"type":"none","width":{"top":0,"right":0,"bottom":0,"left":0},"radius":{"unit":"px","top":0,"right":0,"bottom":0,"left":0},"color":"inherit"}}},"animation":{"name":"","duration":"","delay":""}},"tablet":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}},"mobile":{"typo":{"family":"","size":{"unit":"","value":""},"weight":"","transform":"","style":"","decoration":"","lineHeight":{"unit":"","value":""},"letterSpacing":"","color":{"normal":"","hover":""}},"styles":{"background":{"normal":"","hover":""},"border":{"normal":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""},"hover":{"type":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"unit":"","top":"","right":"","bottom":"","left":""},"color":""}}},"animation":{"name":"","duration":"","delay":""}}},"type":"menu","styles":{"desktop":{"margin":{"unit":"px","top":0,"left":0,"right":0,"bottom":0},"padding":{"unit":"px","top":0,"left":0,"right":0,"bottom":0}},"tablet":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}},"mobile":{"margin":{"unit":"px","top":"","left":"","right":"","bottom":""},"padding":{"unit":"px","top":"","left":"","right":"","bottom":""}}}}]}]}]`
                    }
                    await db.doc('templates/header').set(header, {merge: true})

                    //Compte admin
                    let userInfo = {
                        email: req.body.email,
                        password: req.body.password,
                        lastname: req.body.lastname,
                        firstname: req.body.firstname
                    };
                    auth.createUser({
                        email: userInfo.email,
                        emailVerified: false,
                        password: userInfo.password,
                        displayName: userInfo.lastname + " " + userInfo.firstname
                    })
                        .then(async (user) => {
                            const customData = {
                                lastname: userInfo.lastname,
                                firstname: userInfo.firstname,
                            };
                            await auth.setCustomUserClaims(user.uid, {
                                roles: ["admin", "editor", "moderator", "user"]
                            })
                            db.doc(`users/${user.uid}`).set(customData, {merge: true})
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            res.status(400).json({
                                success: false, errors: {
                                    code: errorCode,
                                    message: errorMessage
                                }
                            });
                        });

                    //Security
                    const source = `service cloud.firestore {
                  match /databases/{database}/documents {
                  //match logged in user doc in users collection
                  match /users/{userId} {
                    allow create: if request.auth.uid != null;
                      allow read: if request.auth.uid == userId;
                    }
                    match /{document=**} {
                      allow read, write: if
                          request.time < timestamp.date(2022, 5, 17);
                    }
                  }
                }`;
                    await admin.securityRules().releaseFirestoreRulesetFromSource(source);

                    //Delete install account
                    var user = firebase.auth().currentUser;

                    user.delete().then(function () {
                        res.status(200).json({success: true});
                    }).catch(function (error) {
                    });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    res.status(400).json({success: false, errors: {errorCode, errorMessage}});
                });
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"});
            break;
    }
};
