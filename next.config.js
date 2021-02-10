module.exports = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    URL: process.env.SERVER,
    GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID,
    GCLOUD_STORAGE_BUCKET_URL: process.env.GCLOUD_STORAGE_BUCKET_URL,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
    PRIVATE_KEY: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
