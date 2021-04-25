import { db } from 'utils/dbConnect';
import { withAuthAdmin } from 'lib/middlewares';

const handler = async (req, res) => {
    const { method } = req;
    switch (method) {
    case 'POST':
        try {
            const item = {
                title: req.body.title,
                slug: req.body.slug,
                content: req.body.content,
                params: req.body.params,
                published: req.body.published,
                author: req.body.author,
            };
            const data = await db.collection('pages').add(item);
            res.status(200).json({
                success: true,
                data: {
                    id: data.id,
                },
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

export default withAuthAdmin(handler);
