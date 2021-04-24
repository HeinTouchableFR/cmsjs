import { firebase } from 'utils/firebaseClient';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'POST':
        const userInfo = {
            email: req.body.email,
            password: req.body.password,
        };
        try {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(async () => {
                    const data = await firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);
                    res.status(200).json({
                        success: true, data,
                    });
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(400).json({
                success: false,
                errors: {
                    code: errorCode,
                    message: errorMessage,
                },
            });
        }
        break;
    default:
        res.status(400).json({
            success: false, errors: "Cette méthode n'est pas disponible",
        });
        break;
    }
};
