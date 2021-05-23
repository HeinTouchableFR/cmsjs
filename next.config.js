module.exports = {
    env: {
        URL: process.env.server,
        GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
        DATABASE_URL: process.env.DATABASE_URL,
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
