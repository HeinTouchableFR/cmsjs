module.exports = {
    env: {
        SERVER: process.env.SERVER,
        MEDIA_SERVER: process.env.MEDIA_SERVER,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        FTP_HOST: process.env.FTP_HOST,
        FTP_PORT: process.env.FTP_PORT,
        FTP_TLS: process.env.FTP_TLS,
        FTP_USER: process.env.FTP_USER,
        FTP_PASS: process.env.FTP_PASS,
        FTP_BASEDIR: process.env.FTP_BASEDIR,
        DB_NAME: process.env.DB_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_URL: `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?schema=public`,
        SECRET: process.env.SECRET,
    },
    i18n: {
        locales: ['en-US', 'en', 'fr', 'de'],
        defaultLocale: 'en-US',
        localeDetection: false,
    },
};
