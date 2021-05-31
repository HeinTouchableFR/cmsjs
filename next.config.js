module.exports = {
    env: {
        SERVER: process.env.SERVER,
        MEDIA_SERVER: process.env.MEDIA_SERVER,
        NEXTAUTH_URL: process.env.SERVER,
        FTP_BASEDIR: process.env.FTP_BASEDIR,
        FTP_URL: process.env.FTP_URL,
        DB_URL: `${process.env.DB_URL}?schema=public?connection_limit=5`,
        SECRET: process.env.SECRET,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        LOCALE: process.env.LOCALE,
    },
    images: {
        domains: [process.env.MEDIA_SERVER.replace('https://', '').replace('http://', '')],
    },
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: process.env.LOCALE,
        localeDetection: true,
    },
};
