module.exports = {
    siteUrl: process.env.SERVER,
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml',
        '/admin',
        '/admin/attributes',
        '/admin/attributes/add',
        '/admin/categories',
        '/admin/categories/add',
        '/admin/dashboard',
        '/admin/install',
        '/admin/login',
        '/admin/templates',
        '/admin/menus',
        '/admin/menus/add',
        '/admin/pages',
        '/admin/pages/add',
        '/admin/products',
        '/admin/products/add',
    ], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.SERVER}/server-sitemap.xml`,
        ],
    },
}
