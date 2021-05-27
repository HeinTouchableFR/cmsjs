import { getPostData } from 'docs/lib/data';

const handler = async (req, res) => {
    const { query: { id, lang },
        method } = req;

    switch (method) {
    case 'GET':
        try {
            const data = await getPostData(id, lang);

            res.status(200).json({
                success: true, data,
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

export default handler;
