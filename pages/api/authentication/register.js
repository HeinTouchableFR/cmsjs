import {auth, db} from 'utils/dbConnect';

export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case 'POST':
            let userInfo = {
                email: "aymericlhomme@orange.fr",
                password: "admin1234",
                lastname: "Lhomme",
                firstname: "Aymeric"
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
                    db.doc(`users/${user.uid}`).set(customData, {merge: true}).then(
                        res.status(200).json({
                            success: true, data: {
                                ...user.user,
                                ...customData
                            }
                        })
                    )

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
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"});
            break;
    }
};
