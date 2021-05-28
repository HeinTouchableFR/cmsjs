import { getSortedPostsData } from 'docs/lib/data';
import FuzzySearch from 'fuzzy-search';

const handler = async (req, res) => {
    const { query: { q, lang },
        method } = req;

    const data = await getSortedPostsData(lang);

    switch (method) {
    case 'GET':
        try {
            const searcher = new FuzzySearch(data, ['name', 'content'], {
                caseSensitive: true,
                sort: true,
            });

            const results = searcher.search(q);
            res.status(200).json({
                success: true, data: results, search: q,
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
