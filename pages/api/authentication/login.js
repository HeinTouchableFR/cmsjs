import {firebase} from 'utils/firebaseClient';

export default async (req, res) => {
    const {method} = req;

    switch (method) {
        case 'POST':
            let userInfo = {
                email: req.body.email,
                password: req.body.password,
            };
            try {
                const data = await firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
                res.status(200).json({
                    success: true, data: data
                });
            } catch (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                res.status(400).json({
                    success: false, errors: {
                        code: errorCode,
                        message: errorMessage
                    }
                });
            }
            break;
        default:
            res.status(400).json({success: false, errors: "Cette méthode n'est pas disponible"});
            break;
    }
};
