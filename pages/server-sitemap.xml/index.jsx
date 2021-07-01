import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    let items = [];
    const res = await fetch(`${process.env.SERVER}/api/posts`);
    const data = await res.json();
    if (data.success) {
        items = data.data;
    }

    const fields = [
    ];

    items.map((item) => fields.push({
        loc: `${process.env.SERVER}/${item.slug}`, // Absolute url
        lastmod: item.updated
            ? new Date(item.updated).toISOString()
            : new Date(item.published).toISOString(),
        // changefreq
        // priority
    }));

    return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
