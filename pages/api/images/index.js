import { db } from 'utils/dbConnect';
import { withAuthAdmin } from 'lib/middlewares';

const handle = async (req, res) => {
    const { method } = req;

    switch (method) {
    case 'GET':
        try {
            db.collection('images')
                .orderBy('created_at', 'desc')
                .get()
                .then((snapshot) => {
                    const items = snapshot.docs.map((doc) => ({
                        _id: doc.id,
                        ...doc.data(),
                    }));
                    Promise.all(items).then((data) => res.status(200).json({
                        success: true, data,
                    }));
                });
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

export default withAuthAdmin(handle);
