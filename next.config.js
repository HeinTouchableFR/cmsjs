module.exports = {
    env: {
        URL: process.env.server,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        SECRET: process.env.SECRET,
        GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
        DATABASE_URL: process.env.DATABASE_URL,
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    i18n: {
        locales: ['en-US', 'en', 'fr', 'de'],
        defaultLocale: 'en-US',
        localeDetection: false,
    },
};
