export default async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'GET':
        try {
            res.status(200).json({
                success: true,
                data: {
                },
            });
        } catch (e) {
            res.status(400).json({
                success: false, errors: e,
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
