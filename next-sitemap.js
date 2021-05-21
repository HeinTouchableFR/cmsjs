module.exports = {
    siteUrl: process.env.server,
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml', '/admin/attributes'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.server}/server-sitemap.xml`,
        ],
    },
}
