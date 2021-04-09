module.exports = {
    env: {
        URL: process.env.server,
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS
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
