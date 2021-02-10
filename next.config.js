module.exports = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    URL: process.env.SERVER,
    GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID,
    GCLOUD_APPLICATION_CREDENTIALS: "pages/api/services/cmsjs-fa640-firebase-adminsdk-nubd4-7fa4af8ee5.json",
    GCLOUD_STORAGE_BUCKET_URL: process.env.GCLOUD_STORAGE_BUCKET_URL,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
