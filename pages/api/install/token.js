import * as admin from 'firebase-admin';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'GET':
        admin
            .auth()
            .createCustomToken('installToken')
            .then((customToken) => {
                res.status(200).json({
                    success: true, data: customToken,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    success: false,
                });
            });
        break;
    default:
        res.status(400).json({
            success: false, errors: "Cette méthode n'est pas disponible",
        });
        break;
    }
};
