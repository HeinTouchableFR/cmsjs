module.exports = {
    siteUrl: process.env.server,
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml', '/admin'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.server}/server-sitemap.xml`,
        ],
    },
}
