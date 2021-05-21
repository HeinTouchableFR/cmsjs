import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    let items = [];
    const res = await fetch(`${process.env.URL}/api/pages`);
    const data = await res.json();
    if (data.success) {
        items = data.data;
    }

    const fields = [
    ];

    items.map((item) => fields.push({
        loc: `${process.env.URL}/${item.slug}`, // Absolute url
        lastmod: item.updated ? item.updated : item.published,
        // changefreq
        // priority
    }));

    return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
